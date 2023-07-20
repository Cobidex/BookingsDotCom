import React, { useEffect, useState } from 'react';

const SearchResults = ({ searchCriteria }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch search results based on the search criteria
    const fetchSearchResults = async () => {
      setIsLoading(true);

      // Perform API call or any data fetching logic here using the searchCriteria

      // Example API call
      try {
        const response = await fetch('/api/accommodations/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchCriteria),
        });
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }

      setIsLoading(false);
    };

    if (Object.keys(searchCriteria).length > 0) {
      fetchSearchResults();
    } else {
      setResults([]);
    }
  }, [searchCriteria]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl text-white font-bold mb-2">Search Results</h2>
          {results && results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          ) : (
            <p className='text-red-500'>No results found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
