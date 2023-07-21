{/*import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const SearchAccommodation = () => {
    const [searchCriteria, setSearchCriteria] = useState({});

    const handleSearch = (criteria) => {
        setSearchCriteria(criteria);
      };


  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <SearchResults searchCriteria={searchCriteria} />
    </div>
  )
}

export default SearchAccommodation*/}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const SearchAccommodation = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchData) => {
    try {
      const response = await axios.post('/api/accommodations/search', searchData);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching accommodations:', error);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchAccommodation;

