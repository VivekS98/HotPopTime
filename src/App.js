import React, { useState } from 'react';
import Home from './components/home';
import Search from './components/search';
import './styling/App.css';

function App() {
  const [type, setType] = useState('movie');
  const [typeView, setTypeView] = useState('Movies');
  const [search, setSearch] = useState(false);

  const HandleShow = (useShow) => {
    switch (useShow) {
      case 'movie':
        setTypeView('Movies');
        setType(useShow);
        break;
      case 'tv':
        setTypeView('TV');
        setType(useShow);
        break;
    }
  }

  return (
    <div className="App">
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
      
      {
        search ?
        <Search /> :
        <Home type={type} />
      }

    </div>
  );
}

export default App;
