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
import axios from 'axios';

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
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
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
