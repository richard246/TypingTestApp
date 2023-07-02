export const fetchQuote = async () => {
  try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * (data.length - 1));
      const quote = data[randomIndex].text;
      const author = data[randomIndex].author;
      return { quote, author };
        
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: '', author: '' };
  }
};






