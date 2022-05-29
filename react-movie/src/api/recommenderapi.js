import axios from "axios";

export default axios.create({
 // baseURL: "https://micro-movies.herokuapp.com/",
  
  baseURL: "http://127.0.0.1:5000", 
  headers: { "Content-Type": "multipart/form-data" },
});