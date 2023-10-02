import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const Home = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      async function fetchUserData() {
        try {
          const response = await fetch('/api/getuser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // You can include authentication headers here if needed.
            },
          });
  
          if (response.ok) {
            // If the response is successful, parse the JSON data.
            const data = await response.json();
            // Update the state with the fetched user data.
            setUserData(data);
          } else {
            // Handle error cases here if needed.
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
  
      // Call the fetchUserData function when the component mounts.
      fetchUserData();
    }, []); // The empty array [] ensures that this effect runs once after the initial render.
  
    return (
      <>
        <Navbar />
        <Dashboard userData={userData} />
      </>
    );
  };
  
  export default Home;
  