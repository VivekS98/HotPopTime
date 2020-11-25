import React, { useState } from 'react';
import Latest from './helper/latest';
import NowPlaying from './helper/now-playing';
import Popular from './helper/popular';
import TopRated from './helper/top-rated';
import UpComing from './helper/upcoming';
import { useHistory } from 'react-router-dom'
import '../styling/App.css';

function Home({ type }) {
    const [typeView, setTypeView] = useState('Movies');
    const history = useHistory();

    const HandleShow = (useShow) => {
        switch (useShow) {
        case 'movie':
            setTypeView('Movies');
            history.push('movies');
            break;
        case 'tv':
            setTypeView('TV');
            history.push('tv');
            break;
        default:
            setTypeView('Movies');
            history.push('movies');
        }
    }

    const showContent = () => {
        if(type === 'movie') {
            return (
                <React.Fragment>
                    <Popular type={type}/>
                    <NowPlaying type={type}/>
                    <TopRated type={type}/>
                    <UpComing type={type}/>
                    <Latest type={type}/>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Popular type={type}/>
                    <TopRated type={type}/>
                    <Latest type={type}/>
                </React.Fragment>
            );
        }
    }

    return (
        <React.Fragment>
            <header className="App-header navbar navbar-expand-lg">
                <span className="logo">HOTPOPTIME</span>
                <div className="dropdown px-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {typeView}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <p className="dropdown-item" onClick={() => HandleShow('movie')} >Movies</p>
                    <p className="dropdown-item" onClick={() => HandleShow('tv')}>TV</p>
                    </div>
                </div>
            </header>
            <div className="d-flex flex-column">
                {showContent()} 
            </div>
        </React.Fragment>
    );
}

export default Home;