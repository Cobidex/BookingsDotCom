import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        '/users/signin',
        { email, password },
      );
      // Handle successful signin
      console.log('User signed in:', response.data);

      // Reset form
      setEmail('');
      setPassword('');
      setError('');

      navigate('/UserDashboard');
    } catch (error) {
      // Handle signin error
      setError(error.response.data.error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      {/* sign in image */}
      {/*<div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          // src=''
          alt="Sample image" />
  </div>*/}

  

      {/* sign in with: */}
      <div className="max-w-md w-full mx-4 bg-gray-600/30 p-6 rounded-lg shadow-md border border-white">
      <div className='text-center text-2xl font-semibold text-teal-400 mb-4'>Sign In</div>
      <div className="text-white mb-4 font-thin text-lg md:text-center">To proceed with your bookings and take advantage of our exclusive member benefits, simply sign in to your account below.</div>
        <div className="text-center md:text-center">
          <label className="mr-1 font-semibold text-white text-lg text-center">Sign in with</label><br />
          {/* Google mail */}
          <button
            type="button"
            className="mx-1 h-10 w-10 rounded-full bg-teal-500 hover:bg-teal-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-5 w-5"
              fill="currentColor"
              viewBox="0 0 30 30">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          {/* Twitter */}
          <button
            type="button"
            className="inlne-block mx-1 h-10 w-10 rounded-full bg-teal-500 hover:bg-teal-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>
        </div>
        {/* OR */}
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-teal-400">Or</p>
        </div>
        {/* FORM */}
        {error && <p>{error}</p>}
        <form onSubmit={handleSignin}>
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)}  required/>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-white text-lg font-thin hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
              {/* Forgot Password */}
            </label>
            <a className="text-teal-400 text-lg font-thin hover:text-teal-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
          </div>
          <div className="text-center md:text-left">
            <button className="mt-4 bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"><a onClick={handleSignin}>Sign In</a></button>
          </div>
        </form>
        {/* Register link */}
        <div className="mt-4 font-thin text-white text-lg text-center md:text-left">
           Don't have an account? <Link className="text-red-600 text-lg font-semibold hover:underline hover:underline-offset-4" to="/SignUp">Register</Link>
        </div>
      </div>
    </section>

  );
};

export default SignIn;
