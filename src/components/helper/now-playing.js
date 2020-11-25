import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { fetchList } from '../../service/api';

export default function NowPlaying({type}){
    const [nowPlaying, setNowPlaying] = useState(null);
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

    return (
        <React.Fragment>
            <h2 className="text-white ml-3">Now Playing</h2>
            <div className="movie-list d-flex flex-row overflow-auto">
            {nowPlayingList}
            </div>
        </React.Fragment>
    );
}