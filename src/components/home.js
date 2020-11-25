import React from 'react';
import Latest from './helper/latest';
import NowPlaying from './helper/now-playing';
import Popular from './helper/popular';
import TopRated from './helper/top-rated';
import UpComing from './helper/upcoming';
import '../styling/App.css';

function Home({ type }) {
    return (
        <div className="d-flex flex-column">
            <Popular type={type}/>
            <Latest type={type}/>
            <NowPlaying type={type}/>
            <TopRated type={type}/>
            <UpComing type={type}/>
        </div>
    );
}

export default Home;