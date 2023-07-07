import React, { useState } from 'react'

const SearchResults = ({ results }) => {
  return (
    <div>
      {/* <h2>Search Results</h2>*/}
      {results.length === 0 ? (
        <p>No Result Found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              {/* Display details of all Search Results */}
              <h3>{result.name}</h3>
              <p>Location: {result.location}</p>
              <p>Type: {result.type}</p>
              <p>Price: {result.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchResults