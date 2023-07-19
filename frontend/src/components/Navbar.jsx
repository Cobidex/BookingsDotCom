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
      <div className="text-white font-bold text-lg">Logo</div>

      {/* Navigation links on the right */}
      <div className="space-x-4 bg-white p-2 rounded-md shadow text-lg font-semibold">
        <Link to="signin" className="text-teal-500">Home</Link>
        <Link to="/accommodation" className="text-teal-500 hover:text-blue-200 navg">Accommodation</Link>
        <Link to="/BookingForm" className="text-teal-500">Booking</Link>
        <Link to="/UserDashboard" className="text-teal-500">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
