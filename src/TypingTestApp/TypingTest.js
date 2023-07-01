import React, { useState, useEffect, useRef } from 'react';
import { fetchQuote } from '../qoute-service';
import ResultsMenu from '../ResultsMenu/ResultsMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { app } from '../firebaseConfig';
function Menu() {
  const [quote, setQuote] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [wpm, setWPM] = useState(0);
  const timerRef = useRef(null);
  const [correctCharsCount, setCorrectCharsCount] = useState(0);
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchData = async () => {
      const quote = await fetchQuote();
      setQuote(quote);
      setCharacterCount(quote.length);
    };

    fetchData();
  }, []);
 

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    // Recalculate correctCharsCount every time
    let newCorrectCharsCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === quote[i]) {
        newCorrectCharsCount++;
      } else {
        break;
      }
    }
    setCorrectCharsCount(newCorrectCharsCount);

    if (!timerRef.current && value.length === 1) {
      startTimer();
    }

    checkMatching(value);
};

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const checkMatching = (value) => {
    if (value === quote) {
      stopTimer();
      calculateWPM();
      
    }
  };
  const calculateWPM = async () => {
    const minutes = timer / 60;
    const accuracy = Math.round((correctCharsCount / characterCount) * 100);
    const wpmValue = Math.round(characterCount / 5 / minutes); // Assuming an average of 5 characters per word
    setWPM(wpmValue);
    
    const storedDataString = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedDataString);
  
    if (parsedData) {
      await saveDataToFirebase(parsedData.name, wpmValue, accuracy); 
    }
  
    navigate(`/results?wpm=${wpmValue}&accuracy=${accuracy}`);
  };
  
  const saveDataToFirebase = async (name, wpm, accuracy) => {
    const db = getFirestore(app); // Access the Firestore instance

    try {
      const docRef = await addDoc(collection(db, "results"), {
        name: name,
        wpm: wpm,
        accuracy: accuracy
      });
      console.log("Data saved to Firestore with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  const renderQuoteWithColors = () => {
    const arrayQuote = quote.split('');
    const arrayValue = inputValue.split('');

    return arrayQuote.map((character, index) => {
      const isCorrect = arrayValue[index] === character;
      const isTyped = index < arrayValue.length;
      const spanStyle = {
        color: isCorrect ? 'black' : 'white',
        textDecoration: isCorrect || !isTyped ? 'none' : 'underline',
      };

      return (
        <span key={index} style={spanStyle}>
          {character}
        </span>
      );
    });
  };

  return (
    <div className="typingTest" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      
    }}>
      <div>
        <div className="timer" id="timer">{timer}</div>
        <div className="quote-display" id="quoteDisplay">
          {renderQuoteWithColors()}
        </div>
        <input type="text" id="text" placeholder="" autoComplete="off" style={{ backgroundImage: 'none',
        backgroundColor: 'transparent',
        flex: 1,
        border: 0,
        outline: 'none',
        }} value={inputValue} onChange={handleInputChange} autoFocus />
     
      </div>
    </div>

  );
}

export default Menu;