import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('location') //Default search is location

  const [location, setLocation] = useState('');
  const [accommodationType, setAccommodationType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSearch function from the parent component with the search criteria
    onSearch({ location, accommodationType, priceRange });
  };

  return (
    //  md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0
    <div className="h-screen flex flex-col">
      <h2 className="text-2xl text-white font-bold mb-2">Accommodation Search</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className='border border-gray-300 rounded py-2 px-4'
          >
            <option value='location'>Location</option>
            <option value='accommodationType'>Accommodation Type</option>
            <option value='priceRange'>Price Range</option>
          </select>
          {searchType === 'location' && (
            <input
              placeholder='Location'
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            />
          )}
          {searchType === 'accommodationType' && (
            <input
              placeholder='Accommodation Type'
              type="text"
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            />
          )}
          {searchType === 'priceRange' && (
            <input
              placeholder='Price Range'
              type="text"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            />
          )}
        <button type="submit" className="mt-4 bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;

