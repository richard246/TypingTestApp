import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
export function ResultsMenu() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const wpm = searchParams.get('wpm');
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const storedDataString = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedDataString);
    setStoredData(parsedData);
  }, []);
  return  (
    <div>
      <div>
        Words Per Minute (WPM): {wpm}
      </div>
      <div>Component B: {storedData ? storedData.name : ""}</div>;
    </div>
  );
}

export default ResultsMenu;