import React from 'react';
import { useLocation } from 'react-router-dom';

export function ResultsMenu() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const wpm = searchParams.get('wpm');

  return (
    <div>
      <div>
        Words Per Minute (WPM): {wpm}
      </div>
    </div>
  );
}

export default ResultsMenu;