import React from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Sign up and sign in
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
// home
import Home from './components/Home'
// search
//import AccommodationSearch from './components/Search/AccommodationSearch'
import SearchForm from './components/Search/SearchForm'
import SearchResults from './components/Search/SearchResults'
// Bookings
import BookingForm from './components/booking/BookingForm'
import BookingDetails from './components/booking/BookingDetails'
// Reviews
import ReviewForm from './components/review/ReviewForm'
import ReviewList from './components/review/ReviewList'
//Dashboard
import UserDashboard from './components/dashboard/UserDashboard'
import BookingHistory from './components/dashboard/BookingHistory'
import Footer from './components/Footer'


import videoBg from './assets/pexels-joão-pedro-15854157 (1080p).mp4'
import Navbar from './components/Navbar'
import SearchAccommodation from './components/Search/SearchAccommodation'



const App = () => {
  return (
    <>
	 <video
	  className='absolute object-cover w-full min-h-screen -z-10 '
	  src={videoBg} autoPlay loop muted/> 
      <div className='backdrop-brightness-50 pt-5'>
        <Navbar />
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/SearchAccommodation' element={<SearchAccommodation />} />
          <Route path='/SearchForm' element={<SearchForm />} />
          <Route path='/SearchResults' element={<SearchResults />} />
          <Route path='/BookingForm' element={<BookingForm />} />
          <Route path='/BookingDetails' element={<BookingDetails />} />
          <Route path='/ReviewForm' element={<ReviewForm />} />
          <Route path='/ReviewList' element={<ReviewList />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/BookingHistory' element={<BookingHistory />} />
        </Routes>
        </div>
        <Footer />
    </>
  )
}

export default App