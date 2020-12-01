import React from 'react';
import Latest from './helper/latest';
import Popular from './helper/popular';
import { useHistory, useParams } from 'react-router-dom'
import '../styling/App.css';

function TV() {
    return (
        <React.Fragment>
            <Popular fetchType="popular" propType='row'/>
            <Popular fetchType="top_rated" propType='row'/>
            <Latest />
        </React.Fragment>
    );
}

function Movies() {
    return (
        <React.Fragment>
            <Popular fetchType="now_playing" propType='row'/>
            <Popular fetchType="popular" propType='row'/>
            <Popular fetchType="top_rated" propType='row'/>
            <Popular fetchType="upcoming" propType='row'/>
            <Latest />
        </React.Fragment>
    );
}

function Home() {
    const history = useHistory();
    const { type } = useParams();

    console.log(type);

    const handleShow = (useShow) => {
        switch (useShow) {
        case 'movie':
            history.push(useShow);
            break;
        case 'tv':
            history.push(useShow);
            break;
        default:
            history.push('movie');
        }
    }

    const showContent = () => {
        if(type === 'movie') {
            return (
                <Movies />
            );
        } else {
            return (
                <TV />
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