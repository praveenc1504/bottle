import React from "react";
import "./Game.css";
function Game({ number }) {
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
  const [scrambled] = React.useState(() =>
  shuffle(bottles.map(b => ({ ...b }))) // clone each bottle
);


  const [b1, setb1] = React.useState("");
  const [b2, setb2] = React.useState("");
  const handleSwap = () => {
    const i1 = parseInt(b1) - 1;
    const i2 = parseInt(b2) - 1;
    if (
      isNaN(i1) ||
      isNaN(i2) ||
      i1 < 0 ||
      i2 < 0 ||
      i1 >= bottles.length ||
      i2 >= bottles.length
    ) {
      alert("Invalid bottle numbers!");
      return;
    }
    const newBottles = [...bottles];
    const tempColor = newBottles[i1].color;
    newBottles[i1].color = newBottles[i2].color;
    newBottles[i2].color = tempColor;

    setBottel(newBottles);
    setb1("");
    setb2("");
    setHint(() => {
      let count = 0;
      for (let i = 0; i < newBottles.length; i++) {
        if (newBottles[i].color === scrambled[i].color) count++;
      }
     if (parseInt(number) === count) {
      setWin(true);
  return `Congratulations! You've arranged all bottles correctly!`;
}

      return `You have ${count} bottles in correct position`;
    });
  };
  return (
    <>
      <div className="game-container">
        {" "}
        <h1>Game started with {number} bottles</h1>
      </div>
      <div className="bottle-grid">
        {bottles.map((i) => (
          <div
            key={i.id}
            className="bottle"
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

      <div className="swap">
        <input
          type="number"
          placeholder="bottle 1"
          value={b1}
          onChange={(e) => setb1(e.target.value)}
        />
        <input
          type="number"
          placeholder="bottle 2"
          value={b2}
          onChange={(e) => setb2(e.target.value)}
        />
        <button onClick={handleSwap}>Swap</button>
      </div>
    </>
  );
}
export default Game;
