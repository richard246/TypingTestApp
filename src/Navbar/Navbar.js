import React, { useEffect } from 'react';
import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function NavBar() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [storedData, setStoredData] = useState(null); // State to store the logged-in user data
  const navigate = useNavigate(); // Access the navigate function

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigateToAnotherComponent(codeResponse); // Call the navigation function on successful login
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          // Update storedData when a new login occurs
          const data = { name: res.data.given_name, age: 25 };
          setStoredData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (profile && profile.name) {
      const data = { name: profile.given_name, age: 25 };
      const dataString = JSON.stringify(data);
      localStorage.setItem("myData", dataString);
      setStoredData(data);
    }
  }, [profile]);

  useEffect(() => {
    const storedDataString = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedDataString);
    setStoredData(parsedData);
  }, []);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setStoredData(null); // Reset storedData on logout
  };

  const navigateToAnotherComponent = (codeResponse) => {
    const { name } = codeResponse.profile; // Extract the name from the codeResponse
    navigate(`/some-path/${name}`); // Programmatically navigate to the desired path with the name
  };

  return (
    
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between" 
         style={{ padding: '0 20px' }}> {/* Add padding to the sides */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <a className="navbar-brand" href="typing">
          Typing Test
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/typing">
              New Test <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/leaderboard">
              Leaderboard
            </a>
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  {profile ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Style storedData.name */}
      <p style={{ marginRight: '10px', color: '#4285F4', fontSize: '1.5em', fontWeight: 'bold' }}>{storedData ? storedData.name : ""}</p> 
      {/* Style the Log out button */}
      <button onClick={logOut} style={{ backgroundColor: '#4285F4', color: '#ffffff', borderRadius: '2px', border: 'none', padding: '8px 16px', cursor: 'pointer', fontSize: '0.8em' }}>Log out</button>
    </div>
  ) : (
    /* Style the Sign in with Google button */
    <button onClick={() => login()} style={{ backgroundColor: '#4285F4', color: '#ffffff', borderRadius: '2px', border: 'none', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8em' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google G Logo" width="16" height="16" style={{ marginRight: '6px' }}/>
      Sign in with Google
    </button>
  )}
</div>
    </nav>
  </div>

  );
}

export default NavBar;