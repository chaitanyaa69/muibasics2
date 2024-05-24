import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import {selectUser } from '../Features/UserSice'; // Corrected typo
import { useNavigate, useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  console.log(location);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
    console.log('User Data:', user);
  }); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      {user && ( // Check if user exists before rendering content
        <>
          <h1>Welcome {user.user.username}</h1>
          <h4>Your user email ID is {user.user.email}</h4>
          <h4>Your lastname is {user.user.lastName}</h4>
          <img src={user.user.image} alt="" />
        </>
      )}
      {!user && ( // Display a placeholder message if user is null
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Success;
