import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



export function ResultsMenu() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const [storedData, setStoredData] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // State to track if data has been saved
  const quote = decodeURIComponent(searchParams.get('quote'));
  const author = decodeURIComponent(searchParams.get('author'));
  useEffect(() => {
    const storedDataString = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedDataString);
 
  }, [storedData, wpm, isSaved]);



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#e8eaf6',
      border: '1px solid #dee2e6',
      borderRadius: '15px',
      padding: '30px',
      width: '80%',
      height: '80vh',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        color: '#424242',
        fontWeight: 'bold',
        fontSize: '2em',
        marginBottom: '20px',
      }}>
        Words Per Minute: {wpm}
      </div>
      <div style={{
        color: '#424242',
        fontSize: '1.2em',
        marginBottom: '20px',
      }}>
        Accuracy: {accuracy}%
      </div>
      <hr style={{
        border: '0',
        height: '1px',
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(66, 66, 66, 0.75), rgba(0, 0, 0, 0))',
        width: '100%',
        margin: '20px 0', // add some vertical margin
      }} />
      <div style={{
        marginTop: '30px',
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#424242',
        marginBottom: '20px',
      }}>
        "{quote}"
      </div>
      <div style={{
        color: '#424242',
        fontSize: '1.2em',
      }}>
        - {author}
      </div>
    </div>
  );
}

export default ResultsMenu;