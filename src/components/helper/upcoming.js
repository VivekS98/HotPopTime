import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function Upcoming({type}){
    const [upcoming, setUpcoming] = useState(null);
    let upcomingList = "loading...";
    useEffect(() => {
        fetchList(type, 'upcoming').then(data => {
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
        <div className="d-flex flex-row">
        {upcomingList}
        </div>
    );
}