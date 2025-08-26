import React ,{useEffect} from "react";
import "./Game.css";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Game({ number, username }) {
   const [show, setShow] =React.useState(false);

  const handleClick = () => {
    setShow(true);

    // stop fireworks after 3 seconds
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };
  const [running, setRunning] =React.useState(true);
    const [time, setTime] = React.useState(0);
    const [undob1, setUndob1] = React.useState(null);
    const [undob2, setUndob2] = React.useState(null);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // cleanup
  }, [running]);

  const undo = () => {
       let newBottles = [...bottles];
      const tempColor = newBottles[undob1].color;
      [newBottles[undob1].color, newBottles[undob2].color] = [
        newBottles[undob2].color,
        tempColor,
      ];
       setBottel(newBottles);
         setHint(() => {
        let count = 0;
        for (let i = 0; i < newBottles.length; i++) {
          if (newBottles[i].color === scrambled[i].color) count++;
        }
      if (parseInt(number) === count) {
  setWin(true);
  handleStop();

  if (number < 4) {
    return <span className="small-congrats">Congratulations! You've arranged all bottles correctly!</span>;
  } else {
    handleClick();
    return "Congratulations! You've arranged all bottles correctly!";
  }
}


        return `You have ${count} bottles in correct position`;
      });
  };
  const handleStop = () => setRunning(false);
  

  // format time as mm:ss
  const formatTime = (t) => {
    const mins = String(Math.floor(t / 60)).padStart(2, "0");
    const secs = String(t % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const [win, setWin] = React.useState(false);
  const [hint, setHint] = React.useState("");
  const COLORS = [
    "#08801eff",
    "#FFB347",
    "#773dffff",
    "#e0e7e1ff",
    "#d7128bff",
    "#000000ff",
    "#cdf40bff",
    "#ff1307ff",
    "#00efdfff",
    "#07e651ff",
  ];
  // Pick colors in sequence from the palette
  const [bottles, setBottel] = React.useState(
    Array.from({ length: number }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
    }))
  );

  // Helper to shuffle array
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Scrambled bottles (same colors, just rearranged)
  const [scrambled] = React.useState(
    () => shuffle(bottles.map((b) => ({ ...b }))) // clone each bottle
  );

  const [b1, setb1] = React.useState("");
  const [b2, setb2] = React.useState("");

  const [sel, setSel] = React.useState(null);
 
  const handleBottleClick = (index) => {
    if (sel === null) {
      setSel(index);
    } else {
      setUndob2(index);
      setUndob1(sel);

      let newBottles = [...bottles];
      const tempColor = newBottles[index].color;
      [newBottles[index].color, newBottles[sel].color] = [
        newBottles[sel].color,
        tempColor,
      ];
      setBottel(newBottles);
      setSel(null);
      setHint(() => {
        let count = 0;
        for (let i = 0; i < newBottles.length; i++) {
          if (newBottles[i].color === scrambled[i].color) count++;
        }
      if (parseInt(number) === count) {
  setWin(true);
  handleStop();

  if (number < 4) {
    return <span className="small-congrats">Congratulations! You've arranged all bottles correctly!</span>;
  } else {
    handleClick();
    return "Congratulations! You've arranged all bottles correctly!";
  }
}


        return `You have ${count} bottles in correct position`;
      });
    }
  };

  const gotoHome = () => {
    window.location.reload();
  };
  return (
    <>
      <button
        onClick={gotoHome}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "8px 16px",
          backgroundColor: "#5100ffff",
        }}
      >
        Back
      </button>
       <button
        onClick={undo}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 16px",
          backgroundColor: "#5100ffff",
        }}
      >
        undo
      </button>
      {show && <Fireworks autorun={{ speed: 6 }} />}
    <div className="timer">
      <h2>⏱️ Time: {formatTime(time)}</h2>
    </div>
      <div className="game-container">
        {" "}
        <h1>Game started with {number} bottles</h1>
      </div>
      <div className="bottle-grid">
        {bottles.map((i) => (
          <div
            key={i.id}
            className={`bottle ${sel === i.id ? "selected" : ""}`}
            onClick={() => handleBottleClick(i.id)}
            style={{ backgroundColor: i.color }}
          >
            {i.id + 1}
          </div>
        ))}
      </div>
      <div
        className="box"
        style={{
          width: `${number * 110}px`,
          height: "110px",
          background: "linear-gradient(135deg, #ece9e6, #ffffff)",
          border: "2px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          margin: "10px auto",
        }}
      >
        <h1>{hint}</h1>
      </div>
      <div className={`bottle-grid ${win ? "" : "bottle-grid_1"}`}>
        {scrambled.map((b, i) => (
          <div key={i} className="bottle" style={{ background: b.color }}>
            {b.id + 1}
          </div>
        ))}
      </div>
    </>
  );
}
export default Game;
