import React, { useState } from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"

const accommodationSearch = () => {
    const [SearchResults, setSearchResults] = useState([])

    const handleSearch = async (searchCriteria) => {
        try {
            // make API call to fetch accommodation data based on search criteria
            const response = await fetch('accommodation search endpoint', {
                method: 'GET',
                header: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(searchCriteria),
            })

            if (response.ok) {
                const data = await response.json()
                setSearchResults(data.results) //set search result to state
                setError('')
            } else {
                // Handle error response
                const errorData = await response.json();
                setError(errorData.message) // set error message
                setSearchResults([]) //clear search result
            }
        } catch (error) {
            // handle network or other errors
            setError('An error occurred. Please try again.') // set error message
            setSearchResults([]) //clear search results
        }
    }

    return (
        <div>
            <h1>Accommodation search</h1>
            {error && <p className="text-red-500">{error}</p>}
            <SearchForm onSearch={handleSearch} />
            <SearchResults results={SearchResults} />
        </div>
    )
}

export default AccommodationSearch
