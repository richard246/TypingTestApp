import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



export function ResultsMenu() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const [storedData, setStoredData] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // State to track if data has been saved

  useEffect(() => {
    const storedDataString = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedDataString);
 
  }, [storedData, wpm, isSaved]);



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // stack the children vertically
      alignItems: 'center', // center the children horizontally
      backgroundColor: '#f8f9fa', // a subtle light grey background color
      border: '1px solid #dee2e6', // light border color
      borderRadius: '15px', // rounded corners
      padding: '20px', // some padding to give elements inside some room
      width: '300px', // fixed width
      margin: '20px auto', // center the element and give it some vertical space
      fontFamily: 'Arial, sans-serif', // a clean, readable font
    }}>
      <div style={{
        color: '#007bff', // blue color to match the theme
        fontWeight: 'bold', // make the text bold
        marginBottom: '10px', // some space to the next div
      }}>
        Words Per Minute (WPM): {wpm}
      </div>
      <div style={{
        color: '#007bff', // blue color to match the theme
        fontWeight: 'bold', // make the text bold
      }}>
        Accuracy: {accuracy}%
      </div>
    </div>
  );
}

export default ResultsMenu;