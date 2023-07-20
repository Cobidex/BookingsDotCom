import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    // mt-5 mb-5
    <div className='grid grid-cols-2 gap-4'>
      <div className='grid text-2xl items-start cursor-pointer bg-teal-500 w-48 text-gray-100 shadow-md rounded-md border-b-2 border-gray-100 p-3 ml-5'>BookingDotCom</div>
      <ul className='grid grid-cols-4 mt-4 text-teal-500'>
        <li><Link className="nav" to="/Home">Home</Link></li>
        {/* <li><a href="\" className='nav'>Home</a></li> */}
        <li><Link className="nav" to="/accommodationSearch">Accommodation</Link></li>
        {/* <li><a href="" className='nav'>Accommodation</a></li> */}
        <li><Link className="nav" to="/BookingForm">Booking</Link></li>
        {/* <li><a href="" className='nav'>Booking</a></li> */}
        <li><Link className="nav" to="/SignIn">Profile</Link></li>
        {/* <li><a href="" className='nav'>Profile</a></li> */}
      </ul>
    </div>
  )
}

export default Navbar