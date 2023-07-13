import React from 'react'
import SignIn from './components/signIn and signUp/SignIn'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <>
      {/*<div className='text-lg text-gray-500'>Hello everyone welcome to <span className='border-b-2 text-teal-500 shadow rounded-md text-2xl'>BookingsDotCom</span></div>*/}
      <Navbar />
      <SignIn />
    </>
  )
}

export default App
