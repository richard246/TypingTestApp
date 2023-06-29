export const fetchQuote = async () => {
    try {
        return fetch('https://type.fit/api/quotes')
          .then(response => response.json())
          .then(data => data[Math.floor(Math.random() * (1642 - 1) + 1)].text)
          
    } catch (error) {
      console.error('Error fetching quote:', error);
      return '';
    }
  };