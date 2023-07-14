import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
import BookingForm from './components/booking/BookingForm'
import BookingDetails from './components/booking/BookingDetails'
import ReviewForm from './components/review/ReviewForm'
import ReviewList from './components/review/ReviewList'


const App = () => {
  return (
    <>
      {/*<div className='text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>*/}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
        <Routes>
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/BookingForm' element={<BookingForm />} />
          <Route path='BookingDetails' element={<BookingDetails />} />
          <Route path='ReviewForm' element={<ReviewForm />} />
          <Route path='ReviewList' element={<ReviewList />} />
        </Routes>
    </>
  )
}

export default App
