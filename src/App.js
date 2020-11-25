import React from 'react';
import Home from './components/home';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './styling/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Redirect exact from='/' to='/movies' />
        <Route path="/tv">
          <Home type='tv' />
        </Route>
        <Route exact path="/movies">
          <Home type='movie' />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
