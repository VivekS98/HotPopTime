import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function TopRated({type}){
    const [topRated, setTopRated] = useState(null);
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

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Top Rated</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {topRatedList}
            </div>
        </React.Fragment>
    );
}