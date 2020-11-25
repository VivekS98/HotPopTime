import React from 'react';
import '../styling/App.css';

export default function MovieCard({movie}){
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="movie-poster" alt="poster" />
            <div className="card-body">
                <h5 className="text-white">{movie.original_title ? movie.original_title : movie.original_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{movie.release_date ? movie.release_date : movie.first_air_date}</h6>
            </div>
        </div>
    );
}