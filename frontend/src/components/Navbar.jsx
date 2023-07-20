{/*import React from 'react'


const Navbar = () => {
  return (
    // mt-5 mb-5
    <div className='grid grid-cols-2 gap-4'>
      <div className='grid text-2xl items-start cursor-pointer bg-gray-100 w-48 text-teal-500 shadow-md rounded-md border-b-2 border-teal-500 p-2 ml-5'>BookingDotCom</div>
      <ul className='grid grid-cols-4 mt-4 text-teal-500'>
        <li><a href="" className='nav'>Home</a></li>
        <li><a href="" className='nav'>Accomodation</a></li>
        <li><a href="" className='nav'>Booking</a></li>
        <li><a href="" className='nav'>Profile</a></li>
      </ul>
    </div>
  )
}

export default Navbar*/}

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation.

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-4 flex items-center justify-between">
      {/* Logo on the left */}
      <div className="text-lg text-teal-500 font-serif bg-white rounded-md cursor-pointer p-1 shadow">BookingsDotCom</div>

      {/* Navigation links on the right */}
      <div className="space-x-8 bg-white p-2 rounded-md shadow text-lg font-semibold">
        <Link to="/" className="text-teal-500 hover:border-b-2 border-teal-400">Home</Link>
        {/*<Link to="/accommodation" className="text-teal-500 hover:border-b-2 border-teal-400 ">Accommodation</Link>*/}
        <Link to="/BookingForm" className="text-teal-500 hover:border-b-2 border-teal-400">Booking</Link>
        <Link to="/UserDashboard" className="text-teal-500 hover:border-b-2 border-teal-400">Profile</Link>
        <Link to="/signup" className="hover:border-b-2 border-teal-400 bg-teal-500 text-white p-1 rounded-md shadow-md">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
