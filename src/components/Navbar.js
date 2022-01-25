import NoteContext from "../context/notes/NoteContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

function Navbar() {
  const context = useContext(NoteContext);
  const {UserName} = context;

  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/"}?"active":""`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about"}?"active":""`} to="/about">About</Link>
            </li>
          </ul>
          {/* if token is there in your browser then show Logout button */}
          {!localStorage.getItem('token') ? <div className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </div> : <div className="d-flex">
            <p className="text-white m-2">Welcome {UserName}</p>
            <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
          </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
