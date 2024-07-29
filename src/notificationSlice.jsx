import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null, // "sending", "success", "error"
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    hideNotification(state) {
      state.status = null;
      state.message = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification } from './store/notificationSlice';
import './App.css'; // Include necessary styles

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const sendRequest = async () => {
    dispatch(showNotification({ status: 'sending', message: 'Sending cart data...' }));

    try {
      // Simulating an API request
      const response = await fetch('/api/send-cart', { method: 'POST' });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      dispatch(showNotification({ status: 'success', message: 'Sent cart data successfully!' }));
    } catch (error) {
      dispatch(showNotification({ status: 'error', message: 'Sending cart data failed!' }));
    }

    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="App">
      {notification.status && (
        <div className={`notification ${notification.status}`}>
          {notification.message}
        </div>
      )}
      <button onClick={sendRequest}>Send Request</button>
    </div>
  );
};

export default App;

