import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import {
  RiMessage3Line,
  RiLogoutBoxLine,
  RiUser3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../../public/logo3.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      // Perform logout API call if necessary
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          withCredentials: true, // If you're using session authentication
        }
      );

      // Clear user data from local storage or state
      localStorage.removeItem("authToken"); // Adjust as necessary

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="company-name-header">
          <p>VIVARDHI</p>
        </div>
        {/* <div className="menu-bar">
            <RxHamburgerMenu size={24} className="toggle-menubar"/>
            
          </div> */}

        {/* <form className="search-box">
            <button type="submit" className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              name="query"
              id="query"
              className="search"
              placeholder="Type to search..."
            />
          </form> */}
        <div className="message-profile">
          <div className="notification">
            <Link to="#">
              <span className="message-icon-div">
                <RiMessage3Line className="message-icon" />
              </span>
            </Link>
          </div>
          <div className="user-menu">
            <svg
              className="svg-profile"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={handleMenuToggle}
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>

            {showMenu && (
              <div className="dropdown-menu">
                <li>
                  <RiUser3Line className="profile-img" size={22} />
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <RiLogoutBoxLine size={22} />
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
