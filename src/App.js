import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [finalResponse, setFinalResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInputChange = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    } else {
      const value = event.target.value;
      console.log('User Input:', value);
      setUserInput(value);
    }
  };

  const adjustTextArea = (event) => {
    event.target.rows = event.target.value.split('\n').length;
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const inputData = userInput;
  
      const serverResponse = await axios.post('134.122.81.181', {
        userInput: inputData
      });

      const responseData = serverResponse.data;

      console.log('Server Response:', responseData);

      if (typeof responseData === 'object' && responseData.hasOwnProperty('response')) {
        setFinalResponse(responseData.response);
      }
  
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="App">
      {isLoading && (
        <>
          <div className="spinner"></div>
          <p>Planning may take a minute or two. Please wait...</p>
        </>
      )}
      <div className="response-container">
        {finalResponse && (
          <>
            <div className="header-container">
              <h2>Product Review:</h2>
            </div>
            <div className="text-container">
              <div className="response-text">{finalResponse}</div>
            </div>
          </>
        )}
      </div>
      <div className="user-input-container">
        <h1>Copilot Planning Bot</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-input">
            <textarea 
              value={userInput} 
              onChange={(event) => {
                handleUserInputChange(event);
                adjustTextArea(event);
              }} 
              onKeyDown={handleUserInputChange} 
              placeholder="Type your message..." 
              rows={1}
            />
            <button type="submit" className="send-button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
