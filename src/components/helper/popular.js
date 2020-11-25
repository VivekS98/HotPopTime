import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Popular({type}){
    const [popular, setPopular] = useState(null);
    let popularList = "loading...";
    useEffect(() => {
        fetchList(type, 'popular').then(data => {
            setPopular(data.results);
            console.log(data);
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
        <div className="d-flex flex-row">
        {popularList}
        </div>
    );
}