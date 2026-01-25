import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Brand */}
      <Link className="navbar-brand" to="/">MyApp</Link>

      {/* Toggler for mobile */}
<button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
 data-bs-target="#sidebarMenu"
 aria-controls="sidebarMenu"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>

      {/* Links */}
 <div className="collapse navbar-collapse" id="sidebarMenu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Signup</Link>
          </li>

          {/* Dropdown */}
          <li className="nav-item dropdown">
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><Link className="dropdown-item" to="/action"></Link></li>
              <li><Link className="dropdown-item" to="/another">Another Action</Link></li>
              <li><Link className="dropdown-item" to="/something">Something else here</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
