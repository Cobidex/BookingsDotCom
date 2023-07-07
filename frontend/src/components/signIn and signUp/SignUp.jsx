import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // access history object
  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      // this make API call to register user using name, email and password
      const response = await fetch('your_registration_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
	  firstName,
	  lastName,
	  email,
	  password,
	  phoneNumber
	}),
      });

      // here handles success response
      if (response.ok) {
        // display success message or redirect to the login page
        setSuccess('Registration successful!');
        setError('');

        // redirect to log inn page after successful sign up
        history.push('/login');
      } else {
        // display error message
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess('');
      }
    } catch (error) {
      // handle network or other errors
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>SignUp</h2>
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>{success}</p>}
      <form onSubmit={handleSignUp}>
        {/* Form fields */}
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
	<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
	<input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp
