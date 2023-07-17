import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // access history object
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      // this make API call to register user using name, email and password

      const response = await axios.post('/api/users/signup', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        },
        { withCredentials: true },
      )
      // here handles success response
      if (response.data) {
        // display success message or redirect to the login page
        setSuccess('Registration successful!')
        setError('')
        // redirect here to either sign up or dashboard
        navigate('/SignIn')
      } else {
        // display error message
        const errorData = await response.json()
        setError(errorData.message)
        setSuccess('')
      }
    } catch (error) {
      // handle network or other errors
      setError('An error occurred. Please try again.')
      setSuccess('')
    }
  };

  return (
<section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
{/* sign up image */}
<div className="md:w-1/3 max-w-sm">
  <img
    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
    // src=''
    alt="Sample image" />
</div>
{/* sign up with: */}
<div className="md:w-1/3 max-w-sm">
  <div className="text-center md:text-left">
    <label className="mr-1">Sign up with</label>
    {/* Google mail */}
    <button
      type="button"
      className="mx-1 h-9 w-9 rounded-full bg-teal-500 hover:bg-teal-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-3.5 w-3.5"
        fill="currentColor"
        viewBox="0 0 30 30">
        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
      </svg>
    </button>
    {/* Twitter */}
    <button
      type="button"
      className="inlne-block mx-1 h-9 w-9 rounded-full bg-teal-500 hover:bg-teal-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-3.5 w-3.5"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    </button>
  </div>
  {/* OR */}
  <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
  </div>
  {/* FORM */}
    {error && <p className='text-red-500'>{error}</p>}
    {success && <p className='text-green-500'>{success}</p>}
    <form onSubmit={handleSignUp}>
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)}  required/>
      <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="text" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
      
      <div className="text-center md:text-left">
        <button className="mt-4 bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"><a onClick={handleSignUp}>Sign Up</a></button>
      </div>
    </form>
  {/* Register link */}
  <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
    Already have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/SignIn">Sign In</Link>
  </div>
</div>
</section>
  )
}

export default SignUp
