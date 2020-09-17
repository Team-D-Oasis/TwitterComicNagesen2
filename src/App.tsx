import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import firebase, {db} from './Firebase';
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import ComicPage from './pages/ComicPage';
import ComicListPage from './pages/ComicListPage';

function App() {
  return (
    <div>
      <Router>
        <AppBar />
        <Switch>
          <Route path="/hp">
            <HomePage />
          </Route>
          <Route path="/my">
            <MyPage />
          </Route>
          <Route path="/comic/:comicId">
            <ComicPage />
          </Route>
          <Route path="/comic_list/:userId">
            <ComicListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
