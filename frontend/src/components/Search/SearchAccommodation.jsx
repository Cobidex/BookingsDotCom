import React, { useState } from 'react';
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

export default SearchAccommodation