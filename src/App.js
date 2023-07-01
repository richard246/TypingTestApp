import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './Navbar/Navbar';
import TypingTest from './TypingTestApp/TypingTest';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import ResultsMenu from './ResultsMenu/ResultsMenu';
import 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {

  const appStyle = {
    textAlign: 'center',
    minHeight: '100vh',
    
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    backgroundImage: 'linear-gradient(135deg, #09C6F9 10%, #045DE9 100%)',
    color: '#fff',
  };

  return (
    <Router>
      <div style={appStyle}>
        <React.StrictMode>
          <NavBar />
          <Routes>
            <Route path="/typing" element={<TypingTest />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/results" element={<ResultsMenu />} />
            <Route path="*" element={<TypingTest />} />
          </Routes>
        </React.StrictMode>
      </div>
    </Router>
  );
};

export default App;