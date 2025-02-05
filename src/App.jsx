import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Ranking from "./components/Ranking/Ranking";
import Tournaments from "./components/Tournaments/Tournaments";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/tournaments" element={<Tournaments />} />
      </Routes>
    </Router>
  );
}

export default App;
