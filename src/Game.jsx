import React from "react";
import "./Game.css";
function Game({ number }) {
  const [hint,setHint]=React.useState("");
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
  const [bottles,setBottel] =React.useState( Array.from({ length: number }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
    })));

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
  const [scrambled] = React.useState(() => shuffle(bottles));

  const [b1,setb1]=React.useState("");
  const [b2,setb2]=React.useState("");
  const handleSwap=()=>{
    const i1=parseInt(b1)-1;
    const i2=parseInt(b2)-1;
    if (
      isNaN(i1) || isNaN(i2) ||
      i1 < 0 || i2 < 0 ||
      i1 >= bottles.length || i2 >= bottles.length
    ) {
      alert("Invalid bottle numbers!");
      return;
    }
    const newBottles=[...bottles];
    const temp=newBottles[i1];
    newBottles[i1]=newBottles[i2];
    newBottles[i2]=temp;
    setBottel(newBottles);
    setb1("");
    setb2("");
  }
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
    margin: "10px auto"
  }}
>{hint}</div>
      <div className="bottle-grid">
        {scrambled.map((b, i) => (
          <div key={i} className="bottle" style={{ background: b.color }}>
            {b.id + 1}
          </div>
        ))}
      </div>

  <div className="swap">
    <input type="number" placeholder="bottle 1"
     value={b1}
     onChange={(e)=>setb1(e.target.value)}/>
    <input type="number" placeholder="bottle 2"
     value={b2}
     onChange={(e)=>setb2(e.target.value)}/>
    <button onClick={handleSwap}>Swap</button>
  </div>
    </>
  );
}
export default Game;
