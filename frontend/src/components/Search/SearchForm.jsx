import React, { useState } from 'react'

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState('')
  const [accommodationType, setAccommodationType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // call the onSearch function from the parent component with the search critria
    onSearch({ location, accommodationType, priceRange })
  }

  return (
    <div>
      {/* <h2>SearchForm</h2> */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)}/>
        <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm