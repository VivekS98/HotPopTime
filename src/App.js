import React from 'react';
import Home from './components/home';
import Popular from './components/helper/popular';
import MovieShow from './components/movie-show';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './styling/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/'>
          <Redirect to="/movie" />
        </Route>
        <Route exact path="/:type">
          <Home />
        </Route>
        <Route path="/:type/top_rated">
          <Popular fetchType="top_rated" propType='full' />
        </Route>
        <Route path="/:type/popular">
          <Popular fetchType="popular" propType='full' />
        </Route>
        <Route path="/:type/now_playing">
          <Popular fetchType="now_playing" propType='full' />
        </Route>
        <Route path="/:type/upcoming">
          <Popular fetchType="upcoming" propType='full' />
        </Route>
        <Route exact path="/:type/:id">
          <MovieShow />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
