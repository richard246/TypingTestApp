import React, { useEffect } from 'react';
import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function NavBar() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate(); // Access the navigate function

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigateToAnotherComponent(codeResponse); // Call the navigation function on successful login
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  let data = { name: "g", age: 25 };
  const dataString = JSON.stringify(data);
localStorage.setItem("myData", dataString);
  useEffect(() => {
    localStorage.setItem("myData", dataString);
  }, []);

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
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const navigateToAnotherComponent = (codeResponse) => {
    const { name } = codeResponse.profile; // Extract the name from the codeResponse
    navigate(`/some-path/${name}`); // Programmatically navigate to the desired path with the name
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="typing">
          Typing Test
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/typing">
                New Test <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">
                Leaderboard
              </a>
            </li>
            <li className="nav-item dropdown">
              <div>
                {profile ? (
                  <div>
                    <p>Name: {profile.name}</p>
                    <button onClick={logOut}>Log out</button>
                  </div>
                ) : (
                  <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0"></form>
        </div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </nav>
    </div>
  );
}

export default NavBar;