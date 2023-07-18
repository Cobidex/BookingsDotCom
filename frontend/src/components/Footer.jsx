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

