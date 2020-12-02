import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styling/App.css';

export default function MovieCard({type, movie}){
    const history = useHistory();

    const handleClick = () => {
        history.push(`/${type}/${movie.id}`);
    }

    return (
        <div className="movie-card" onClick={() => handleClick()}>
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} className="movie-poster" alt="poster" />
            <div className="card-body">
                <h5 className="margin-title text-white">{movie.title ? movie.title : movie.name}</h5>
                <h6 className="margin-title card-subtitle mb-2 text-muted">{movie.release_date ? movie.release_date : movie.first_air_date}</h6>
            </div>
        </div>
    );
}