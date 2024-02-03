import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import './index.css';

function BirthdateSelection() {
  const location = useLocation();
  const { state } = location;
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  let name, email, imageUrl, googleId;

  if (location.state) {
    ({ name, email, imageUrl, googleId } = location.state);
  }
  if (state) {
    const { name, email, imageUrl, googleId } = state;
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Picture:", imageUrl);
    console.log("Google ID:", googleId);
  }

  async function handleSubmit(event) {
      event.preventDefault();

      // Basic validation to check if birthdate is not empty
      if (!birthdate) {
          setError('Please enter a valid birthdate.');
          return;
      }

      try {
        const response = await axios.post('http://localhost:3000/users/saveUserData', {
          googleId,
          name: name,
          picture:imageUrl,
          email,
          birthdate,
        });
    
        console.log('Request data:', {
          googleId,
          name: name,
          picture:imageUrl,
          email,
          birthdate,
        });
        console.log (typeof(email));
    
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
    
        if (response.status === 200) {
          console.log('Data saved successfully');
          setSuccessMessage('User data successfully updated!');
          setError('');
        } else {
          console.log('Error saving data');
          setError('An error occurred while saving the user data.');
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error during axios.post:', error);
        setError('An error occurred while saving the user data.');
        setSuccessMessage('');
      }
  }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
              <button type="submit">Submit</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
  );
}

export default BirthdateSelection;

