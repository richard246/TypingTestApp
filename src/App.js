import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './Navbar/Navbar';
import TypingTest from './TypingTestApp/TypingTest';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import ResultsMenu from './ResultsMenu/ResultsMenu';
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
  
  return (

    <Router>
      <React.StrictMode>
        <NavBar />
        <Routes>
          <Route path="/typing" element={<TypingTest />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/results" element={<ResultsMenu />} />
          <Route path="*" element={<TypingTest />} />
        </Routes>
      </React.StrictMode>
    </Router>

  );
};

export default App;