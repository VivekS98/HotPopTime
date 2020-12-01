import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams} from 'react-router-dom';
import { fetchList } from '../../service/api';

export default function Popular({ propType, fetchType }){
    const [popular, setPopular] = useState([]);
    const [fetcher, setFetchType] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const history = useHistory();
    const { type } = useParams();

    let list = null;

    const handleFetchNewPage = (pageNos) => {
        setPage(pageNos);
    }

    useEffect(() => {
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
        })
                .catch(err => console.log(err))
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
                        className="movie-card text-center text-secondary" 
                        style={{padding: '150px 100px'}} 
                        onClick={() => handleClick()}
                        >
                            <b>More</b>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else if(propType === 'full') {
            return (
                <React.Fragment>
                    <h2 className="text-white ml-3">Popular</h2>
                    <div className="movie-title d-flex flex-row flex-wrap justify-content-center align-items-center">
                        {list}
                        <div 
                          className="movie-card text-center text-secondary" 
                          style={{padding: '150px 100px'}} 
                          onClick={page === totalPages ? null : () => handleFetchNewPage(page+1)}
                        >
                            <b>More</b>
                        </div>
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