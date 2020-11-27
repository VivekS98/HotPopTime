import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams } from 'react-router-dom';
import { fetchList } from '../../service/api';

export default function TopRated({ propType }){
    const [topRated, setTopRated] = useState(null);
    const history = useHistory();
    const { type } = useParams();
    
    let topRatedList = null;
    useEffect(() => {
        fetchList(type, 'top_rated').then(data => {
            setTopRated(data.results);
            console.log(data);
        })
                              .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(topRated) {
        topRatedList = topRated.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    const handleClick = () => {
        history.push(`/${type}/top_rated`);
    }

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Top Rated</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {topRatedList}
            <div className="movie-card text-center text-secondary" style={{padding: '150px 100px'}} onClick={() => handleClick()}><b>More</b></div>
            </div>
        </React.Fragment>
    );
}