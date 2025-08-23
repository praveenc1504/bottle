import React from "react";
import Game from "./Game";
import './Home.css';
function Home() {
  const [number, setNumber] = React.useState(0);
  const [startGame, setStartGame] = React.useState(false);

  function start() {
    const num = parseInt(number);
    if (num >= 3 && num <= 10) {
      setStartGame(true);
    } else {
      alert("Please enter a number between 3 and 10");
    }
  }

  if (startGame) {
    return <Game number={number} />;
  }

  return (
    <>
      <div>
        <h1>Welcome to the Bottle Game!</h1>
      </div>
      <div>
        <p>This is about bottle shuffle game, enter your number of bottles (3–10)</p>
        <input
          type="number"
          placeholder="Enter number (3-10)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={start}>Start</button>
      </div>
    </>
  );
}

export default Home;
