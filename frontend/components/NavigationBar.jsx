// components/NavigationBar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';
import axios from 'axios';
import { SearchContext } from './Search';

function NavigationBar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, setSearchResults } = useContext(SearchContext);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/video/search/searched?q=${searchTerm}`);
      setSearchResults(response.data);
      navigate('/search');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/user/logout');
      if (response.data.success) {
        localStorage.removeItem('authToken');
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          VTU Tutorials and Notes
        </Link>

        <div className="search-bar-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for videos..."
            className="search-input"
          />
          <button type="button" onClick={handleSearch} className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="navbar-end">
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
