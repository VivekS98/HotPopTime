import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../service/api';
import '../styling/App.css';

function Production({ data }) {
    let arrayShow = data.map((item, ind) => {
        return (
            <div key={ind} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w300${item.logo_path}`} className="movie-poster" alt="logo" />
                <div className="card-body">
                    <h5 className="text-white">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.origin_country}</h6>
                </div>
            </div>
        );
    });

    return (
        <div className="movie-list d-flex flex-row overflow-auto">
            {arrayShow}
        </div>
    );
}

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
                        <div className="d-flex flex-column justify-content-around">
                            <div className="d-flex flex-column">
                                <h2 className="text-light">{data.title ? data.title : data.name}</h2>
                                <h6 className="movie-title text-white-50">{data.tagline}</h6>
                                <h5 className="movie-title text-white-50">{data.release_date ? data.release_date : data.first_air_date}</h5>
                            </div>
                            <div className="d-flex flex-row flex-wrap">
                                <h4 className="text-white">Adult:</h4>
                                <h6 className="text-white-50 movie-title">{data.adult ? 'True' : 'False'}</h6>
                            </div>
                            <div className="d-flex flex-row flex-wrap">
                                <h4 className="text-white">Genres:</h4>
                                {genresView}
                            </div>
                            <div className="d-flex flex-row flex-wrap">
                                <h4 className="text-white">Language:</h4>
                                <h6 className="text-white-50 movie-title">{data.spoken_languages[0].english_name}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="movie-overview">
                        <h3 className="text-white">Overview:</h3>
                        <p className="movie-title text-white">{data.overview}</p>
                    </div>
                    <div className="movie-overview">
                        <h3 className="text-white">Production:</h3>
                        <Production data={data.production_companies} />
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