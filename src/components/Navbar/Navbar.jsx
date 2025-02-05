import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/USPA-logo.png"; // Asegúrate de colocar la imagen en la carpeta adecuada

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="USPA Logo" />
      </Link>
      <button className={`header-button ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="top-line"></span>
        <span className="middle-line"></span>
        <span className="bottom-line"></span>
      </button>
      <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
        <ul className="header-ul">
          <li className="header-li">
            <Link to="/">Ranking</Link>
          </li>
          <li className="header-li">
            <Link to="/tournaments">Tournaments</Link>
          </li>
          {/* Se puede agregar la autenticación más adelante */}
          {/* {isAdmin && (
            <li className="header-li">
              <button className="logout-btn">LOGOUT</button>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
