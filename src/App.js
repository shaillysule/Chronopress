import './App.css';
import NavBar from './components/NavBar';
import React, { Component } from 'react';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API;
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleSearch = (query) => {
    this.setState({ query });
  };
  state={
    progress:0
  }
    setProgress=(progress)=>{
      this.setState({progress:progress})
    }
  render() {
    return (
      <div>
        <Router>
          <NavBar onSearch={this.handleSearch} />
          <LoadingBar
          height={3}
        color="#f11946"
        progress={this.state.progress}
    
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={10} country="us" category="general" query={this.state.query} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={10} country="us" category="business" query={this.state.query} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={10} country="us" category="entertainment" query={this.state.query} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={10} country="us" category="health" query={this.state.query} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={10} country="us" category="science" query={this.state.query} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={10} country="us" category="sports" query={this.state.query} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={10} country="us" category="technology" query={this.state.query} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
