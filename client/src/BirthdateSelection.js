import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Select from "react-select";
import crushesData from "./name.json";
import { useNavigate } from "react-router-dom";

function BirthdateSelection() {
  const interestsRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);
  const [crush, setCrush] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let name = "";
  let email = "";
  let imageUrl = "";
  let googleId = "";

  if (location.state) {
    ({ name, email, imageUrl, googleId } = location.state);
    localStorage.setItem("googleId", googleId);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    // imageUrl, birthdate, gender, interests, and crush will be stored later when they are available
  }

  const interestOptions = [
    { value: "coding", label: "Coding" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "reading", label: "Reading" },
    { value: "traveling", label: "Traveling" },
    { value: "cooking", label: "Cooking" },
    { value: "gardening", label: "Gardening" },
    { value: "painting", label: "Painting" },
    // Add more options as needed
  ];
  const crushOptions = crushesData.map((person) => ({
    value: person["NAME"],
    label: person["NAME"],
  }));

  const handleInterestsChange = (selectedOptions) => {
    if (selectedOptions.length > 4) {
      setErrorMessage("You can select a maximum of 4 interests");
    } else {
      setInterests(selectedOptions || []);
      setErrorMessage(""); // Clear the error message when the selection is valid
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation to check if birthdate, gender, or interests are empty
    if (!birthdate || !gender || interests.length === 0) {
      setError(
        "Please enter a valid birthdate, gender, and at least one interest."
      );
      return;
    }

    localStorage.setItem("birthdate", birthdate);
    localStorage.setItem("gender", gender);
    localStorage.setItem(
      "interests",
      JSON.stringify(interests.map((interest) => interest.value))
    );
    localStorage.setItem('crush', crush.value);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/saveUserData",
        {
          googleId,
          name,
          picture: imageUrl,
          email,
          birthdate,
          gender,
          interests: interests.map((interest) => interest.value),
          crush: crush.value,
        }
      );

      console.log("Request data:", {
        googleId,
        name,
        picture: imageUrl,
        email,
        birthdate,
        gender,
        interests: interests.map((interest) => interest.value),
        crush: crush.value,
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        console.log("Data saved successfully");
        setSuccessMessage("User data successfully updated!");
        setError("");
        navigate("/profile-summary");
      } else {
        console.log("Error saving data");
        setError("An error occurred while saving the user data.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error during axios.post:", error);
      setError("An error occurred while saving the user data.");
      setSuccessMessage("");
    }
  };
  const handleCrushChange = (selectedOption) => {
    setCrush(selectedOption);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
        />
        <div>
          <Select
            isMulti
            options={interestOptions}
            onChange={handleInterestsChange}
            isOptionDisabled={(option) =>
              interests.length >= 4 && !interests.includes(option)
            }
          />
          {errorMessage && <div>{errorMessage}</div>}
          {/* Rest of your component */}
        </div>
        <Select
          options={crushOptions}
          onChange={handleCrushChange}
          isSearchable={true}
          isClearable={true}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default BirthdateSelection;
