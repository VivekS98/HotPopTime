import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styling/App.css';

export default function Search() {
    const [type, setType] = useState('movie');
    const [queryString, setQueryString] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [year, setYear] = useState('');
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(queryString.length > 0) {
            history.push(`/search/${type}/${queryString}/${language}/${year}`);
        }
    }

    return (
        <form className='search d-flex flex-column justify-content-center align-items-center' onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-white">Search Anything</h2>
            <div className="form-group input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search Movies" 
                  aria-label="Search Movies" 
                  value={queryString}
                  aria-describedby="button-addon2" 
                  onChange={(e) => setQueryString(e.target.value)}
                />
            </div>
            <div className="search-params input-group form-group d-flex flex-row">
                <div className="dropdown px-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {type === 'movie' ? 'Movies' : 'TV'}
                    </button>
                    <div className="dropdown-menu" style={{cursor: 'default'}} aria-labelledby="dropdownMenuButton">
                    <p className="dropdown-item" onClick={() => setType('movie')} >Movies</p>
                    <p className="dropdown-item" onClick={() => setType('tv')}>TV</p>
                    </div>
                </div>
                <div className="dropdown px-2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {language === 'en-US' ? 'English' : 'Other'}
                    </button>
                    <div className="dropdown-menu" style={{cursor: 'default'}} aria-labelledby="dropdownMenuButton">
                    <p className="dropdown-item" onClick={() => setLanguage('en-US')} >English</p>
                    <p className="dropdown-item" onClick={() => setLanguage(null)}>Other</p>
                    </div>
                </div>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Year" 
                  aria-label="Year" 
                  value={year}
                  aria-describedby="button-addon2" 
                  onChange={(e) => setYear(e.target.value)}
                />
            </div>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
            </div>
        </form>
    );
}