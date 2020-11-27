import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams } from 'react-router-dom';
import { fetchList } from '../../service/api';

export default function Upcoming({ propType }){
    const [upcoming, setUpcoming] = useState(null);
    const history = useHistory();
    const { type } = useParams();
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

    const handleClick = () => {
        history.push(`/${type}/upcoming`);
    }

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Upcoming</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {upcomingList}
            <div className="movie-card text-center text-secondary" style={{padding: '150px 100px'}} onClick={() => handleClick()}><b>More</b></div>
            </div>
        </React.Fragment>
    );
}