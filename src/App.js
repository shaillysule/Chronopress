import './App.css';
import NavBar from './components/NavBar';
import React, { useState, useCallback } from 'react';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
  }, []);

  return (
    <div>
      <Router>
        <NavBar onSearch={handleSearch} />
        <LoadingBar
          height={3}
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="us" category="general" query={query} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country="us" category="business" query={query} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={10} country="us" category="entertainment" query={query} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={10} country="us" category="health" query={query} />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10} country="us" category="science" query={query} />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={10} country="us" category="sports" query={query} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10} country="us" category="technology" query={query} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
