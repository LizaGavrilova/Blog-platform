import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from '../Header';
import { ArticleList } from '../ArticleList';
import { Article } from '../Article';

import classes from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={classes.app}>
        <Header />
        
        <div className={classes.main}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />  
            <Route path="/articles/:id" element={<Article />} />          
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;

