import React, { useState, useEffect } from 'react';
import { fetchList } from '../service/api';
import '../styling/App.css';

function Home({ type }) {
    const [popular, setPopular] = useState();
    const [nowPlaying, setNowPlaying] = useState();
    const [latest, setLatest] = useState();
    const [topRated, setTopRated] = useState();
    const [upComing, setUpComing] = useState();
    let showList= null;

    useEffect(() => {
        fetchList(type, 'popular').then(data => setPopular(data))
                              .catch(err => console.log(err))
        fetchList(type, 'now_playing').then(data => setNowPlaying(data))
                              .catch(err => console.log(err))
        fetchList(type, 'latest').then(data => setLatest(data))
                              .catch(err => console.log(err))
        fetchList(type, 'top_rated').then(data => setTopRated(data))
                              .catch(err => console.log(err))
        fetchList(type, 'upcoming').then(data => setUpComing(data))
                              .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="home">
            
        </div>
    );
}

export default Home;