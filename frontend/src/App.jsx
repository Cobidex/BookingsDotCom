import React from 'react'
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
import AccommodationSearch from './components/Search/accommodationSearch'


const App = () => {
  return (
    <>
      <div className='text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>
      {/* <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/SignUp">Register Here</Link> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
        <Routes>
          {/* <Route path='*' element={<App />} /> */}
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/accommodationSearch' element={<AccommodationSearch />} />
        </Routes>
    </>
  )
}

export default App
