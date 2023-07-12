import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // access history object
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/users/signin', {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok){
        // redirect to dashboard after successful login
        navigate.push('/dashboard')
      } else {
        const errorData = await response.json()
        setError(errorData.message)
      }
    } catch (error) {
      setError('An error occurred, please try again.')
    }
  }
  
  return (
    <div>
      <h2>Sign In</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleSignIn}>
        {/* Form fields */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* submit button */}
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
