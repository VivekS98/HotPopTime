import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../service/api';


export default function MovieShow() {
    const [data, setData] = useState(null);
    const { type, id } = useParams();
    
    useEffect(() => {
        fetchDetails(type, id).then(data => {setData(data); console.log(data)})
                              .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showDetails = () => {
        if(data) {
            return (
                <div className="d-flex flex-row w-100 h-100" style={{
                    background: `url(https://image.tmdb.org/t/p/original${data.backdrop_path}) center no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} className="movie-poster-details" alt="poster" />
            <h2 className="movie-title text-white">{data.title ? data.title : data.name}</h2>
                </div>
            );
        }
    
    }

    return (
        <React.Fragment>
            {showDetails()}
            {JSON.stringify(data)}
        </React.Fragment>
    );
}