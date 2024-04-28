import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import Sidebar from './sidebar';
import { useEffect } from 'react';

const ChessGame = () => {
  const [fen, setFen] = useState('start');
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [moves2, setMoves2] = useState([]);
  const [evaluation, setEvaluation] = useState(0);
  const [bestMoves, setBestMoves] =  useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const makeMove = () => {
    if (currentMoveIndex < moves.length) {
      const move = moves[currentMoveIndex];
      setTimeout(() => {
        game.move(move);
        setFen(game.fen());
        setCurrentMoveIndex(currentMoveIndex + 1);
        setMoves2(prevMoves2 => [...prevMoves2, move]);
  
        fetch('/run-python-script', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ move })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to execute Python script');
          }
          return response.json();
        })
        .then(data => {
          console.log('Python script executed successfully:', data);
          const bestMove = data.bestMove;
          const getMove = data.getMove;
  
          setBestMoves(prevBestMoves => [...prevBestMoves, bestMove]);
  
          // Set the getMove as the move to be played
          game.move(getMove);
          setFen(game.fen());
          setMoves([...moves, getMove]);
          setMoves2([...moves2, getMove]);
          setCurrentMoveIndex(currentMoveIndex + 2); // Increment by 2 to skip over the getMove in moves array
  
  
        })
        .catch(error => {
          console.error('Error executing Python script:', error);
        });
      }, 3000);
    }
  };
  
  
  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' 
    });

    if (move === null) return;

    setFen(game.fen());
    setMoves([...moves, move.san]);
    setMoves2([...moves2, move.san]);
    setCurrentMoveIndex(currentMoveIndex + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
    <div style={{ display: 'flex', margin: '20px', gap: '100px' }}>
      <Sidebar moves={moves2} bestMoves={bestMoves} />
      <Chessboard
        position={fen}
        onDrop={onDrop}
        dropOffBoard="trash"
        sparePieces={false}
      />
    </div>
    <button onClick={makeMove} style={{ marginTop: '5px', color: 'black', background: 'grey', fontSize: '1.2em', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>See Move</button>
    </div>
  );
};

export default ChessGame;
