import React, { useEffect, useState } from 'react';

const ProfileSummary = () => {
  const [userData, setUserData] = useState({
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    birthdate: localStorage.getItem('birthdate'),
    gender: localStorage.getItem('gender'),
    interests: JSON.parse(localStorage.getItem('interests')),
    crush: localStorage.getItem('crush'),
  });

  useEffect(() => {
    // If any of the required fields are missing, log an error and return
    if (!userData.name || !userData.email || !userData.birthdate || !userData.gender || !userData.interests || !userData.crush) {
      console.error('Missing user data in local storage');
      return;
    }
  }, []);

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Birthdate: {userData.birthdate}</p>
      <p>Gender: {userData.gender}</p>
      <p>Interests: {userData.interests.join(', ')}</p>
      <p>Crush: {userData.crush}</p>
    </div>
  );
};

export default ProfileSummary;