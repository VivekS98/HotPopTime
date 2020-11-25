import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Latest({type}){
    const [latest, setLatest] = useState(null);
    let latestList = null;
    useEffect(() => {
        fetchList(type, 'latest').then(data => {
            setLatest([data]);
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
        <React.Fragment>
            <h2 className="text-white ml-3">Latest</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {latestList}
            </div>
        </React.Fragment>
    );
}