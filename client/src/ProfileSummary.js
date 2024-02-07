import React, { useEffect, useState } from "react";

const ProfileSummary = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const googleId = localStorage.getItem("googleId");
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
