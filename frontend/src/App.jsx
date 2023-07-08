import React from 'react'
import SignIn from './components/signIn and signUp/SignIn'
import SignUp from './components/signIn and signUp/SignUp'
import AccommodationSearch from './components/Search/accommodationSearch'

const App = () => {
  return (
    <>
      <div className='min-h-screen text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>
      <SignIn />
      <SignUp />
      <AccommodationSearch />
    </>
  )
}

export default App
