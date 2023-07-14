import React from 'react'


const Navbar = () => {
  return (
    <div className='grid grid-cols-2 mt-5 mb-5 gap-4'>
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

export default Navbar