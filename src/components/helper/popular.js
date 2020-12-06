import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams} from 'react-router-dom';
import { fetchList, searchQuery, fetchSimilarList } from '../../service/api';

export default function Popular({ propType, fetchType }){
    const [popular, setPopular] = useState([]);
    const [fetcher, setFetchType] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const history = useHistory();
    const { id, type, string, language, year } = useParams();

    let list = null;

    useEffect(() => {
        if(fetchType === 'search') {
            searchQuery(type, string, language, year, page ).then(data => {
                setPopular([...popular, ...data.results]);
                setTotalPages(data.total_pages);
                setFetchType('Results');
                console.log(data);
            }).catch(err => console.log(err));
        } else if(fetchType === 'similar') {
            fetchSimilarList(type, id, 'en-US', page).then(data => {
                setPopular([...popular, ...data.results]);
                setTotalPages(data.total_pages);
                setFetchType('Similar');
                console.log(data);
            }).catch(err => console.log(err));
        } else {
            fetchList(type, fetchType, 'en-US', page).then(data => {
                setPopular([...popular, ...data.results]);
                setTotalPages(data.total_pages);
                switch(fetchType){
                    case 'popular':
                        setFetchType('Popular');
                        break;
                    case 'now_playing':
                        setFetchType('Now Playing');
                        break;
                    case 'top_rated':
                        setFetchType('Top Rated');
                        break;
                    case 'upcoming':
                        setFetchType('Upcoming');
                        break;
                    default:
                        setFetchType(null);
                }
                console.log(data);
            }).catch(err => console.log(err))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    if(popular) {
        list = popular.map((val, ind) => {
            return <MovieCard key={ind} type={type} movie={val} />
        });
    }

    const showContent = () => {
        if(propType === 'row') {
            return (
                <React.Fragment>
                    <h2 className="text-white ml-3">{fetcher}</h2>
                    <div className="movie-list d-flex flex-row overflow-auto">
                        {list}
                        <div 
                        className="movie-card text-center text-secondary d-flex flex-column justify-content-center align-items-center"
                        onClick={() => handleClick()}
                        >
                            <b style={{padding: '100px'}}>More</b>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else if(propType === 'full') {
            return (
                <React.Fragment>
                    <h2 className="text-white ml-3">{fetcher}</h2>
                    <div className="movie-title d-flex flex-row flex-wrap justify-content-center">
                        {list}
                        {
                            page !== totalPages ?
                            <div 
                            className="movie-card text-center text-secondary d-flex flex-column justify-content-center align-items-center"
                            onClick={page === totalPages ? null : () => setPage(page+1)}
                            >
                                <b style={{padding: '100px'}}>More</b>
                            </div> :
                            null
                        }
                    </div>
                </React.Fragment>
            );
        }
    }
    
    const handleClick = () => {
        history.push(`/${type}/${fetchType}`);
    }

    return (
        <React.Fragment>
            {showContent()}
        </React.Fragment>
    );
}