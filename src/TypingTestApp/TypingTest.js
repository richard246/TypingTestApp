import React, { useState, useEffect, useRef } from 'react';
import { fetchQuote } from '../qoute-service';
import ResultsMenu from '../ResultsMenu/ResultsMenu';
import { Link } from 'react-router-dom';

function Menu() {
  const [quote, setQuote] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [timer, setTimer] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [wpm, setWPM] = useState(0);
  const timerRef = useRef(null);

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

  const calculateWPM = () => {
    const minutes = timer / 60;
    const wpmValue = Math.round(characterCount / 5 / minutes); // Assuming an average of 5 characters per word
    setWPM(wpmValue);
    
    window.location.href = `/results?wpm=${wpmValue}`;
  };

  const renderQuoteWithColors = () => {
    const arrayQuote = quote.split('');
    const arrayValue = inputValue.split('');

    return arrayQuote.map((character, index) => {
      const isCorrect = arrayValue[index] === character;
      const spanStyle = {
        color: isCorrect ? 'green' : 'red',
      };

      return (
        <span key={index} style={spanStyle}>
          {character}
        </span>
      );
    });
  };

  return (
    <div className="typingTest">
      <div className="timer" id="timer">{timer}</div>
      <div className="quote-display" id="quoteDisplay">
        {renderQuoteWithColors()}
      </div>
      <input type="text" id="text" placeholder="" value={inputValue} onChange={handleInputChange} autoFocus />
      <div>Total Characters: {characterCount}</div>
      {wpm > 0 && (
        <div>
          Words Per Minute (WPM): {wpm}
        </div>
      )}
    </div>

  );
}

export default Menu;