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
            let genres = [...data.genres];
            let genresView = genres.map((item, ind) => {
                return (
                    <h6 className="text-white-50" key={ind} style={{margin: '10px'}}>{item.name}</h6>
                );
            });
            return (
                <div className="movie-details w-100 h-100">
                    <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className="movie-backdrop" alt="backdrop" />
                    <div className="movie-info d-flex flex-row">
                        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} className="movie-poster-details" alt="poster" />
                        <div className="d-flex flex-column">
                            <h2 className="text-light">{data.title ? data.title : data.name}</h2>
                            <h5 className="text-white-50">{data.release_date ? data.release_date : data.first_air_date}</h5>
                            <h4 className="text-light">Genres</h4>
                            <div className="d-flex flex-row flex-wrap">
                            {genresView}
                            </div>
                        </div>
                    </div>
                    <div className="movie-overview">
                        <h3 className="text-light">Overview</h3>
                        <p className="text-white">{data.overview}</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            {showDetails()}
        </React.Fragment>
    );
}