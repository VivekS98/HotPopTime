import React from 'react';
import Home from './components/home';
import TopRated from './components/helper/top-rated';
import Popular from './components/helper/popular';
import NowPLaying from './components/helper/now-playing';
import Upcoming from './components/helper/upcoming';
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
        <Route exact path="/:type/top_rated">
          <TopRated propType='full' />
        </Route>
        <Route exact path="/:type/popular">
          <Popular propType='full' />
        </Route>
        <Route exact path="/:type/now_playing">
          <NowPLaying propType='full' />
        </Route>
        <Route exact path="/:type/upcoming">
          <Upcoming propType='full' />
        </Route>
        <Route exact path="/:type/:id">
          <MovieShow />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
