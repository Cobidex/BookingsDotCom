// import React from 'react';

// const SearchResults = ({ results }) => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-2">Search Results</h2>
//       {results.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {results.map((result) => (
//             <li key={result.id} className="border border-gray-300 p-4 rounded">
//               {/* Display the details of each search result */}
//               <h3 className="text-xl font-bold mb-2">{result.name}</h3>
//               <p className="mb-1">Location: {result.location}</p>
//               <p className="mb-1">Type: {result.type}</p>
//               <p className="mb-1">Price: {result.price}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchResults;




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
      const response = await fetch('/api/accommodation/search', {
        method: 'GET',
        body: JSON.stringify(searchCriteria),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResults(data);

      // Placeholder code to simulate loading and setting results
      setTimeout(() => {
        setResults([
          { id: 1, name: 'Accommodation 1' },
          { id: 2, name: 'Accommodation 2' },
          { id: 3, name: 'Accommodation 3' },
        ]);
        setIsLoading(false);
      }, 2000);
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
          {results.length > 0 ? (
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
