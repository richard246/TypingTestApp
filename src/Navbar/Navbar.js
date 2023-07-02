import React, { useEffect } from 'react';
import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; 

function NavBar() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [storedData, setStoredData] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
  
    const storedProfileString = localStorage.getItem("profile");
    if (storedProfileString) {
      const parsedProfile = JSON.parse(storedProfileString);
      setProfile(parsedProfile);
    }
  }, []);

  useEffect(() => {
    if (profile && profile.name) {
      const data = { name: profile.given_name, age: 25 };
      const dataString = JSON.stringify(data);
      localStorage.setItem("myData", dataString);
     
      localStorage.setItem("profile", JSON.stringify(profile));
      setStoredData(data);
    } else {
      
      localStorage.removeItem("profile");
    }
  }, [profile]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigateToAnotherComponent(codeResponse); 
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user && user.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
         
          const data = { name: res.data.given_name };
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
    localStorage.removeItem("myData"); 
    setProfile(null);
    setStoredData(null); 
  };

  const navigateToAnotherComponent = (codeResponse) => {
    const { name } = codeResponse.profile; 
    navigate(`/some-path/${name}`);
  };

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between" 
             style={{ padding: '0 20px' }}> 
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
  {!profile ? (
    /* Style the Sign in with Google button */
    <button onClick={() => login()} style={{ backgroundColor: '#4285F4', color: '#ffffff', borderRadius: '2px', border: 'none', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8em' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google G Logo" width="16" height="16" style={{ marginRight: '6px' }}/>
      Sign in with Google
    </button>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ marginRight: '10px', color: '#4285F4', fontSize: '1.5em', fontWeight: 'bold', marginTop: '5px' }}>{storedData ? storedData.name : ""}</p>
      <button onClick={logOut} style={{ backgroundColor: '#4285F4', color: '#ffffff', borderRadius: '2px', border: 'none', padding: '8px 16px', cursor: 'pointer', fontSize: '0.8em' }}>Log out</button>
    </div>
  )}
</div>
        </nav>
      </div>
    );

  
}

export default NavBar;