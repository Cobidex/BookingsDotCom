import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation.
import logo from '../assets/bookings_logo.png'

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-4 flex items-center justify-between">
      {/* Logo on the left */}
      {/* <div className="text-lg text-teal-500 font-serif bg-white rounded-md cursor-pointer p-1 shadow">BookingsDotCom</div> */}
      <img src={logo} class="h-12 mr-3" alt="BookingDotCom Logo" />

      {/* Navigation links on the right */}
      <div className="space-x-8 bg-white p-2 rounded-md shadow text-lg font-semibold">
        <Link to="/" className="text-teal-500 hover:border-b-2 border-teal-400">Home</Link>
        {/*<Link to="/accommodation" className="text-teal-500 hover:border-b-2 border-teal-400 ">Accommodation</Link>*/}
        <Link to="/bookinghistory" className="text-teal-500 hover:border-b-2 border-teal-400">Booking</Link>
        <Link to="/signin" className="text-teal-500 hover:border-b-2 border-teal-400">Profile</Link>
        <Link to="/signup" className="hover:border-b-2 border-teal-400 bg-teal-500 text-white p-1 rounded-md shadow-md">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;