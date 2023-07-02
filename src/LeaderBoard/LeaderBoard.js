import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

function LeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const leaderboardRef = collection(db, 'results');
    const leaderboardQuery = query(leaderboardRef, orderBy('wpm', 'desc'), limit(5));

    const unsubscribe = onSnapshot(leaderboardQuery, (snapshot) => {
      const leaderboardEntries = [];
      const existingEntries = new Set();

      snapshot.forEach((doc) => {
        const entry = doc.data();
        entry.id = doc.id; // Add the document ID to the entry data

        if (!existingEntries.has(entry.id)) { // Check the entry id instead of name-wpm
          leaderboardEntries.push(entry);
          existingEntries.add(entry.id);
        }
      });

      setLeaderboardData(leaderboardEntries);
    });

    return () => unsubscribe();
  }, []);
 
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: '0',
      padding: '0',
    }}>
      <div className="card text-center" style={{
        backgroundImage: 'none',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '15px',
        padding: '20px',
        width: '60%', // reduced width to 60% of the container width
        height: '80vh',
        fontFamily: 'Arial, sans-serif',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h3 style={{ color: '#343a40' }}>Leaderboard</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {leaderboardData.map((entry, index) => (
            <li key={entry.id} style={{
              padding: '10px 0',
              backgroundColor: index === 0 ? '#007bff' : 'transparent',
              color: index === 0 ? '#ffffff' : '#495057',
              fontWeight: index === 0 ? 'bold' : 'normal',
              borderRadius: '10px',
              border: index === 0 ? '3px solid #343a40' : 'none',
            }}>
              {entry.name}: {entry.wpm} WPM
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LeaderBoard;