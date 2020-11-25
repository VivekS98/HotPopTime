import React from 'react';

export default (movie) => {
    return (
        <div class="card" style="width: 18rem;">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} class="card-img-top" alt="poster" />
        <div class="card-body">
        <h5 class="card-title">{movie.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{movie.release_date}</h6>
        </div>
        </div>
    );
}