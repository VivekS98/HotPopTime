import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MovieCard from './movie-card';
import { fetchDetails, fetchSimilarList } from '../service/api';
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
    const [data, setData] = useState([]);
    const [similar, setSimilar] = useState([]);
    const { type, id } = useParams();
    const history = useHistory();

    const handleClick = () => {
        history.push(`/similar/${type}/${id}`);
    }

    useEffect(() => {
        fetchDetails(type, id).then(data => {setData(data); console.log(data);})
                              .catch(err => console.log(err));
        fetchSimilarList(type, id).then(data => setSimilar(data))
                                .catch(err => console.log(err));
        window.scrollTo(0,0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const showDetails = () => {
        try {
            let genresView = [...data.genres].map((item, ind) => {
                return (
                    <h6 className="movie-title text-white-50" key={ind}>{item.name}</h6>
                );
            });
            let languages = [...data.spoken_languages].map((item, ind) => {
                return (
                    <h6 key={ind} className="movie-title text-white-50">{item.english_name}</h6>
                );
            });
            let similarView = [...similar.results].map((item, ind) => {
                return (
                    <MovieCard key={ind} type={type} movie={item} />
                );
            });
            return (
                <div style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <div className="movie-details w-100 h-100">
                        <div className="movie-info d-flex flex-row">
                            <img src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} className="movie-poster-details" alt="poster" />
                            <div className="d-flex flex-column justify-content-around">
                                <div className="paras d-flex flex-column">
                                    <h3 className="text-light">{data.title ? data.title : data.name}</h3>
                                    <h6 className="text-white-50">{data.tagline}</h6>
                                </div>
                                <div className="d-flex flex-row flex-wrap">
                                    <h6 className="text-white">Rating:</h6>
                                    <h6 className="movie-title text-white-50">{data.vote_average}</h6>
                                </div>
                                <div className="d-flex flex-row flex-wrap">
                                    <h6 className="text-white">Adult:</h6>
                                    <h6 className="movie-title text-white-50">{data.adult ? 'True' : 'False'}</h6>
                                </div>
                                <div className="d-flex flex-row flex-wrap">
                                    <h6 className="text-white">Language:</h6>
                                    {languages}
                                </div>
                            </div>
                        </div>
                        <div className="paras movie-overview d-flex flex-row flex-wrap align-items-center">
                            <h5 className="movie-title text-white">Release:</h5>
                            <h6 className="movie-title text-white-50">{data.release_date ? data.release_date : data.first_air_date}</h6>
                        </div>
                        <div className="paras movie-overview d-flex flex-row flex-wrap align-items-center">
                            <h5 className="movie-title text-white">Genres:</h5>
                            {genresView}
                        </div>
                        <div className="paras movie-overview">
                            <h3 className="movie-title text-white">Overview:</h3>
                            <p className="movie-title text-justify text-white">{data.overview}</p>
                        </div>
                        <div className="paras movie-overview">
                            <h3 className="movie-title text-white">Production:</h3>
                            <Production data={data.production_companies} />
                        </div>
                        <div className="movie-overview">
                            <h3 className="text-white ml-3">Similar</h3>
                            <div className="movie-list d-flex flex-row overflow-auto">
                            {similarView}
                            {
                                similar.total_pages > 1 ? 
                                <div 
                                className="movie-card text-center text-secondary d-flex flex-column justify-content-center align-items-center"
                                onClick={() => handleClick()}
                                >
                                    <b style={{padding: '100px'}}>More</b>
                                </div> :
                                null
                            }
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch(err) {
            return null;
        }
    }

    return (
        <React.Fragment>
            {showDetails()}
        </React.Fragment>
    );
}