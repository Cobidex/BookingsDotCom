<<<<<<< HEAD
import React from 'react';

const Footer = () => {
	  return (
		      <div className="relative">
		        <video
		          className="w-full h-auto absolute top-0 left-0 z-0"
		          autoPlay
		          muted
		          loop
		        >
		          <source src="https://drive.google.com/uc?export=download&id=1PG5AzdF16nRx2p9W0g_xnEVhXrulzARb" type="video/mp4" />
		          Your browser does not support the video tag.
		        </video>

		        {/* Your other content goes here */}
		      </div>
		    );
};

export default Footer;
=======
import React from 'react'
//import videoBg from '../assets/pexels-joão-pedro-15854157 (1080p).mp4'

const Footer = () => {
  return (
    <div>
      <video src={videoBg} autoPlay loop muted
      className=''/>
    </div>
  )
}
>>>>>>> abc502b7eee50b057f19eacd50e9a8c99ef00a31

