const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '75f49154067c35aa93fcb726bdcc2adb',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;