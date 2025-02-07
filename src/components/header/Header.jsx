import './header.scss'
// import { NavLink } from "react-router-dom";
import Logo from '/img/argentBankLogo.png?url';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to={"/"}>
          <img
              className="main-nav-logo-image"
              src={Logo}
              alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          <NavLink to={"/user/id"} className="main-nav-item" href="./user.html">
            <FontAwesomeIcon icon={faCircleUser} />
            Tony
          </NavLink>

          <NavLink to={'/signout'} className="main-nav-item">
            <FontAwesomeIcon icon={faRightFromBracket} />
            Sign Out
          </NavLink>

          <NavLink to={"/login"} className={({isActive}) => isActive ? `main-nav-item active` : "main-nav-item"}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        </div>
      </nav>
  );
};

export default Header;

