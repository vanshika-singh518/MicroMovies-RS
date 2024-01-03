const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '3d2d7c9b8757ca4982ea4b6254788094',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;