import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Latest({type}){
    const [latest, setLatest] = useState(null);
    let latestList = "loading...";
    useEffect(() => {
        fetchList(type, 'latest').then(data => {
            setLatest(data.results);
            console.log(data);
        })
                              .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(latest) {
        latestList = latest.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    return (
        <div className="d-flex flex-row">
        {latestList}
        </div>
    );
}