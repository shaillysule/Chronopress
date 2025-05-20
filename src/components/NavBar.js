import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';

// export class NavBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: ''
//     };
//   }
const NavBar=({onSearch})=>{
  const [query,setQuery]=useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
onSearch(query);
  };


    return (
      <div>
        <nav className="navbar  navbar-expand-lg bg-black fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">ChronoPress</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link text-white " to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/Business">business</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/health">Health</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/technology">Technology</Link></li>
              </ul>
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search News"
                  aria-label="Search"
                  value={query}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  
};

export default NavBar;
