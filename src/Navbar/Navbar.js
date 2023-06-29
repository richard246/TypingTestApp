import React, { useEffect } from 'react';

function NavBar() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '634085441712-ua472ml9q1tern06t1nfhvj3v86mvnrt.apps.googleusercontent.com', // Replace with your actual Google OAuth client ID
      callback: handleGoogleSignIn, // Callback function for handling sign-in
      cancel_on_tap_outside: false, // Allow sign-in overlay to remain open when clicked outside
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );
  }, []);

 const handleGoogleSignIn = (response) => {
  // Handle the Google sign-in response here
  const user = response?.profileObj;
  if (user) {
    console.log('Logged in as:', user.givenName);
  }
};
 


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="typing">Typing Test</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/typing">New Test <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">Leaderboard</a>
            </li>
            <li className="nav-item dropdown">
             <div className="App">
<div id="signInDiv"></div>
             </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;