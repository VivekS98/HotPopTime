import React from 'react';

export default function MovieCard({movie}){
    console.log(movie);
    return (
        <div className="card" style={{width: '100px'}}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="card-img-top" alt="poster" />
            <div className="card-body">
                <h5 className="card-title">{movie.original_title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{movie.release_date}</h6>
            </div>
        </div>
    );
}