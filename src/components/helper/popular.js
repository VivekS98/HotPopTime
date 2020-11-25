import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Popular({type}){
    const [popular, setPopular] = useState(null);
    let popularList = null;
    useEffect(() => {
        fetchList(type, 'popular').then(data => {
            setPopular(data.results);
            console.log(data.results);
        })
                .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(popular) {
        popularList = popular.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Popular</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {popularList}
            </div>
        </React.Fragment>
    );
}