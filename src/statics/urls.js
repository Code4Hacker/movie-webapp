export const trendingsPath = ({page}) => `movie/now_playing?language=en-US&page=${page}`;
export const popularPath = ({page}) => `movie/popular?language=en-US&page=${page}`;
export const topratedPath = ({page}) => `movie/top_rated?language=en-US&page=${page}`;
export const upcomingPath = ({page}) => `movie/upcoming?language=en-US&page=${page}`;
export const movieProviderPath = `watch/providers/movie?language=en-US`;
export const searchPath = ({query, page}) => `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;