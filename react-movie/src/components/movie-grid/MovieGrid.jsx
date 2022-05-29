import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import movie_names from '../movie-grid/movie_names.json';
import {
    getMovieCastData,
    getMovieData,
    getRecommendedMoviesData,
  } from "../../utils";
import recommender_api from "../../api/recommenderapi";
import InputMovieCard from './InputMovieCard'
import RowMovieCard from './RowMovieCard'
import MovieCastCard from '../MovieCastCard/MovieCastCard'
import Loading from '../../components/Loading'
import Error from './Error'

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi, { category, movieType} from '../../api/tmdbApi';


const MovieGrid = props => {

    const [items, setItems] = useState([]);
    
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    );
}

const MovieSearch = props => {

    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [keyword,setkeyword] = useState(props.keyword ? props.keyword : '');
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recommendedMovies, setRecommendedMovies] = useState(null);
    const [inputMovieData, setInputMovieData] = useState(null);
    const [castData, setCastData] = useState(null);

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const loadMovieNames = () => {
          setMovies(movie_names.movie_names);
        };

        const dummieAPIRequest = async () => {
            await recommender_api.get("/");
        };

        loadMovieNames();
        dummieAPIRequest();
    }, []);

    const onChangeHandler = (text_value) => {
        let matches = [];
        if (text_value.length > 0) {
          matches = movies.filter((movie) => {
            const regex = new RegExp(`${keyword}`, "gi");
            return movie.title.match(regex);
          });
        }
        if (matches.length > 10) matches = matches.slice(0, 8);

        setSuggestions(matches);
        setkeyword(text_value);
    };

    const onSuggestHandler = (text_value) => {
        setkeyword(text_value);
        setSuggestions(null);
    };

    const movieHandler = async (movie_name) => {
    
        setLoading(true);
        setError(null);

        const request = new FormData();
        request.append("movie_name", movie_name);
        request.append("number_of_recommendations", 10);
    
        const response = await recommender_api.post("/recommend_movie", request);
    
        const responseData = response.data;
        if (responseData.error) {
            setError(responseData.error);
        } else {
          const movie_data = await getMovieData(responseData.input_movie.movie_id);
          const recommendations_movie_data = await getRecommendedMoviesData(
            responseData.recommendations
          );
    
          const movieCastData = await getMovieCastData(
            responseData.input_movie.movie_id
          );
    
          setCastData(movieCastData);
          setInputMovieData(movie_data);
          setRecommendedMovies(recommendations_movie_data);

          setLoading(false);
        }
        setLoading(false);
    };
    
    const handleClick = async () => {
        await movieHandler(keyword);
    };
    
    const handleCardClick = async (movie_name) => {
        setkeyword(movie_name);
        await movieHandler(movie_name);
    };
    
    const doubleclick = async () => {
        goToSearch();
        handleClick();
    };

    let finalComponent = null;
    if (loading) finalComponent = <Loading/>;
    else if (error) {
        finalComponent = <Error error={error} />;
      }
    else
    {
        finalComponent = recommendedMovies && (
          <>
            <br />
            <br />
            <div className="recommendation_section">
              <InputMovieCard {...inputMovieData} />
              <br />
    
              <center>
                <h1 className="title">About "{inputMovieData.title}" Cast</h1>
              </center>
              <br />
    
              <div className="cast_data_cards">
                {castData.map((cast) => {
                  return (
                    cast.profile_path && <MovieCastCard key={cast.id} {...cast} />
                  );
                })}
              </div>
    
              <br />
              <center>
                <h1 className="title">Recommended Movies Based On Your Search</h1>
              </center>
              <div className="recommendation_row">
                {recommendedMovies.map((movie) => {
                  return (
                    <div
                      key={movie.id}
                      onClick={(e) => handleCardClick(movie.title)}
                    >
                      <RowMovieCard key={movie.rank} {...movie} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
    }

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

   // if (loading) finalComponent = <Loading />;

    return (
        <div className="app">
            <div className="movie-search">
                <Input
                    type="text"
                    placeholder="Enter keyword"
                    value={keyword}
                    onChange={(e) => onChangeHandler(e.target.value)}
                    onBlur={() => {
                        setTimeout(() => {
                        setSuggestions(null);
                        }, 200);
                    }}
                />

                <Button className="small" onClick={doubleclick}>Search</Button>
                
                { suggestions && (
                <div className="suggestion_container">
                { suggestions.map((suggestion, i) => {
                    return (
                        <div
                            className="suggestion"
                            onClick={() => onSuggestHandler(suggestion.title)}
                            key={i}
                        >
                        {suggestion.title}
                    </div>
                    );
                })}
                </div>
            )}
            </div>
            <br/>

            {finalComponent}
        </div>
    )
}

export default MovieGrid;
