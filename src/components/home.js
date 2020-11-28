import React from 'react';
import Latest from './helper/latest';
import NowPlaying from './helper/now-playing';
import Popular from './helper/popular';
import TopRated from './helper/top-rated';
import UpComing from './helper/upcoming';
import { useHistory, useParams } from 'react-router-dom'
import '../styling/App.css';

function Home() {
    const history = useHistory();
    const { type } = useParams();

    console.log(type);

    const handleShow = (useShow) => {
        switch (useShow) {
        case 'movie':
            history.push('movie');
            break;
        case 'tv':
            history.push('tv');
            break;
        default:
            history.push('movie');
        }
    }

    const showContent = () => {
        if(type === 'movie') {
            return (
                <React.Fragment>
                    <NowPlaying propType='row'/>
                    <Popular propType='row'/>
                    <TopRated propType='row'/>
                    <UpComing propType='row'/>
                    <Latest />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Popular propType='row'/>
                    <TopRated propType='row'/>
                    <Latest />
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
                    {type === 'movie' ? 'Movies' : 'TV'}
                    </button>
                    <div className="dropdown-menu" style={{cursor: 'default'}} aria-labelledby="dropdownMenuButton">
                    <p className="dropdown-item" onClick={() => handleShow('movie')} >Movies</p>
                    <p className="dropdown-item" onClick={() => handleShow('tv')}>TV</p>
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