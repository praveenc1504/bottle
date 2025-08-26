import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import Login from './Login.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:username" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;