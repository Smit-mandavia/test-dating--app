import React, { useEffect } from "react";
import GoogleLogin from "@stack-pulse/next-google-login";
import { useNavigate } from "react-router-dom";
require('./debugger');
async function loginWithGoogle(tokenId, navigate) {
  try {
    const response = await fetch("http://localhost:3000/authenticateGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId }),
      
  
  
    });
  

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const data = await response.json();

    // Store the JWT in local storage
    localStorage.setItem("jwt", data.token);

    // Optionally, you can store other user-related information
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username);

    console.log("Login success");
    global.debugVar(response);
    // Redirect to a success page or perform other actions as needed
    // navigate("/success");
  } catch (error) {
    console.error("Login failed:", error.message);
    
    // Handle the error, show an error message to the user, etc.
  }
}


function LoginPage() {
  const navigate = useNavigate();
  console.log("LoginPage is being rendered");

  useEffect(() => {
    const name = localStorage.getItem("name");
    // If all the required fields are present, redirect to the ProfileSummary page
    if (name) {
      navigate("/profile-summary");
    }
  }, [navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle login form submission here
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Form submitted:", { email, password });
    // You can send the form data to your backend for authentication
  };

  const responseGoogle = async (response) => {
    console.log("Google login response:", response);
    global.debugVar(response);
    // Extract tokenId correctly from the response
    const tokenId = response?.tokenObj?.id_token;

    if (!tokenId) {
      console.error("Token ID is undefined");
      // Handle the error or return early
      return;
    }

    

    const { profileObj, tokenResponse } = response;
    const { name, email, imageUrl, googleId } = profileObj;

    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Picture:", imageUrl);
    // console.log("Google ID:", googleId);
    // console.log("Token Response:", tokenResponse);

    await loginWithGoogle(tokenId);

    // Optionally, you can store other user-related information
    // in local storage as well, depending on your application needs
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("imageUrl", imageUrl);
    localStorage.setItem("googleId", googleId);
    // localStorage.setItem("tokenID",tokenId);

    navigate("/success");
    navigate("/birthdate", { state: { name, email, imageUrl, googleId } });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

      <div>
        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>

      <br />
      <GoogleLogin
        clientId="1095865446899-ij588crmvvagq1jco12pvljahfma6oo6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginPage;
