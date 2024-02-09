import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const ProfileSummary = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('tokenId');
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      const googleId = localStorage.getItem("googleId");
      console.log(googleId);
      const response = await fetch(`/api/user/google/${googleId}`);
      const data = await response.json();

      setUserData(data);
    }

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Birthdate: {userData.birthdate}</p>
      <p>Gender: {userData.gender}</p>
      <p>Interests: {userData.interests.join(", ")}</p>
      <p>Crush: {userData.crush}</p>
    </div>
  );
};

export default ProfileSummary;
