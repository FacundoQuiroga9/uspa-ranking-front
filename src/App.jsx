import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Ranking from "./components/Ranking/Ranking";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route path="/tournaments" element={<h1>Sección de torneos</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
