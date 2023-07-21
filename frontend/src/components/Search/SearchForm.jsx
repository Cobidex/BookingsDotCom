{/*import React, { useState } from 'react';

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
      <h2 className="text-2xl text-teal-400 font-bold mb-2">Accommodation Search</h2>
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

export default SearchForm;*/}


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchAccommodation = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [accommodations, setAccommodations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/accommodations/search', {
        location,
        type,
        price,
      });
      setAccommodations(response.data);
    } catch (error) {
      console.error('Error searching accommodations:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            className="w-full border p-2 rounded-md"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full border p-2 rounded-md"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <input
            className="w-full border p-2 rounded-md"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <Link to='/searchresults'
          className="bg-teal-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </Link>
      </div>
      <div className="mt-4">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold">{accommodation.name}</h3>
            <p>{accommodation.description}</p>
            <p className="font-semibold">Price per night: ${accommodation.pricePerNight}</p>
            <p>Type: {accommodation.type}</p>
            <p>Rating: {accommodation.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAccommodation;




