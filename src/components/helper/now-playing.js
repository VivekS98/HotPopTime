import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function NowPlaying({type}){
    const [nowPlaying, setNowPlaying] = useState(null);
    let nowPlayingList = "loading...";
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

    return (
        <div className="d-flex flex-row">
        {nowPlayingList}
        </div>
    );
}