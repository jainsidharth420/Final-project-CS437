import React from 'react';

const Sidebar = ({ moves = [], bestMoves = [] }) => {
    return (
      <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ccc' }}>
        <h3>Move History:</h3>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>
<div>
  <strong>Move:</strong> {move}
</div>
<div>
  <strong>Best Move:</strong> {bestMoves[index] || 'No best move yet'}
</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Sidebar;
