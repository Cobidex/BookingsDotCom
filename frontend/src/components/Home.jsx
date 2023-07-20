import React from 'react'
import AccommodationSearch from './Search/accommodationSearch'
//import Navbar from './Navbar'

const Home = () => {
  return (
    <div className=" min-h-screen py-8">
      {/*<Navbar />*/}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl text-white font-bold mb-4">Welcome to <span className='text-teal-500 font-serif bg-white rounded-md cursor-pointer p-1 shadow-lg'>BookingsDotCom</span></h1>
        <p className="text-lg text-white mb-6">
          Discover the best accommodations for your travel destinations. Use our powerful search fields to find your perfect stay.
        </p>
        <AccommodationSearch />
        <p className="text-lg text-white">
          Start your journey by entering your desired location, accommodation type, and price range in the search form above.
        </p>
      </div>
    </div>
  )
}

export default Home