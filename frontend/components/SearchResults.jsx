// components/SearchResults.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from './Search';

function SearchResults() {
  const { searchResults } = useContext(SearchContext);

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <Link to={`/video/${result._id}`}>
                {/* <h2>{result.title}</h2> */}
              <img src={result.thumbnail} alt={result.title} className='thumbnail'  />  
               <h3>{result.title}</h3>
              
         
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
