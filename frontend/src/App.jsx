import React from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Sign up and sign in
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
// search
import AccommodationSearch from './components/Search/accommodationSearch'
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
import Footer from './components/dashboard/BookingHistory'


const App = () => {
  return (
    <>
      <div className='bg-[url("https://drive.google.com/file/d/1PG5AzdF16nRx2p9W0g_xnEVhXrulzARb/view?usp=sharing")] bg-cover min-h-screen'>
      {/*<div className='text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>*/}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
        <Routes>
          {/* <Route path='*' element={<App />} /> */}
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/accommodationSearch' element={<AccommodationSearch />} />
          <Route path='/SearchForm' element={<SearchForm />} />
          <Route path='/SearchResult' element={<SearchResults />} />
          <Route path='/BookingForm' element={<BookingForm />} />
          <Route path='/BookingDetails' element={<BookingDetails />} />
          <Route path='/ReviewForm' element={<ReviewForm />} />
          <Route path='/ReviewList' element={<ReviewList />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/BookingHistory' element={<BookingHistory />} />
	  <Route path='/Footer' element={<Footer />} />
        </Routes>
        </div>
    </>
  )
}

export default App
