import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Upcoming({type}){
    const [upcoming, setUpcoming] = useState(null);
    let upcomingList = null;
    useEffect(() => {
        fetchList(type, 'upcoming')
            .then(data => {
            setUpcoming(data.results);
            console.log(data);
        })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(upcoming) {
        upcomingList = upcoming.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Upcoming</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {upcomingList}
            </div>
        </React.Fragment>
    );
}