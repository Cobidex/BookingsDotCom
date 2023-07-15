import React from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
import AccommodationSearch from './components/Search/accommodationSearch'
import BookingForm from './components/booking/BookingForm'
import BookingDetails from './components/booking/BookingDetails'
import ReviewForm from './components/review/ReviewForm'
import ReviewList from './components/review/ReviewList'


const App = () => {
  return (
    <>
      <div className='bg-gray-100 min-h-screen'>
      {/*<div className='text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>*/}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
        <Routes>
          {/* <Route path='*' element={<App />} /> */}
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/accommodationSearch' element={<AccommodationSearch />} />
          <Route path='/BookingForm' element={<BookingForm />} />
          <Route path='BookingDetails' element={<BookingDetails />} />
          <Route path='ReviewForm' element={<ReviewForm />} />
          <Route path='ReviewList' element={<ReviewList />} />
        </Routes>
        </div>
    </>
  )
}

export default App
