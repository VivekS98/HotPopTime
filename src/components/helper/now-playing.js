import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams } from 'react-router-dom'
import { fetchList } from '../../service/api';

export default function NowPlaying({ propType }){
    const [nowPlaying, setNowPlaying] = useState(null);
    const history = useHistory();
    const { type } = useParams();
    
    let nowPlayingList = null;
    useEffect(() => {
        fetchList(type, 'now_playing').then(data => {
            setNowPlaying(data.results);
            console.log(data);
        })
                              .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(nowPlaying) {
        nowPlayingList = nowPlaying.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    const handleClick = () => {
        history.push(`/${type}/now_playing`);
    }

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Now Playing</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {nowPlayingList}
            <div className="movie-card text-center text-secondary" style={{padding: '150px 100px'}} onClick={() => handleClick()}><b>More</b></div>
            </div>
        </React.Fragment>
    );
}