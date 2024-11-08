export const movie_format = ({ movie, username }) => {
    return JSON.stringify({
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title,
        video: `${movie.video}`,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        usr_mail:username

    });
}