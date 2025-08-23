import React from 'react';
import './Game.css';
function Game({number}){
    const COLORS = [
    "#08801eff", "#FFB347", "#773dffff", "#e0e7e1ff", "#d7128bff",
    "#000000ff", "#cdf40bff", "#ff1307ff", "#00efdfff", "#07e651ff"
  ];
  // Pick colors in sequence from the palette
  const bottles = Array.from({ length: number }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length] // cycle through 13 colors
  }));

    return(
        <>
        <div className="game-container"> <h1>Game started with {number} bottles</h1>
        </div>
         <div className="bottle-grid">
           {bottles.map((i)=>(
            <div key={i.id} className="bottle" style={{backgroundColor:i.color}}>     
                {i.id + 1}
                </div>
              ))}
        </div>
        
        </>
        
    )
}
export default Game;