import React from 'react';
import './App.css';
import ChessGame from './components/chessboard';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="container">
      <div className="main">
        <div className="messages"style={{alignContent: "center"}}>
          <div style={{marginLeft: "600px"}}>
          CHESSBOARD TRACKER
          </div>
        </div>
        <div style={{ alignSelf: 'center' }}>
          <h1>Chess Game</h1>
          <ChessGame />
        </div>
       
      </div>
    </div>
  );
}

export default App;
