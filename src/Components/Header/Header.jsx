import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { RiAccountCircleLine, RiMessage2Line, RiNotification2Line, RiLogoutBoxLine, RiUser3Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      // Perform logout API call if necessary
      await axios.post('http://localhost:8000/api/logout/', {}, {
        withCredentials: true // If you're using session authentication
      });

      // Clear user data from local storage or state
      localStorage.removeItem('authToken'); // Adjust as necessary

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error if needed
      // Optionally, redirect to an error page or login page
      navigate('/login');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-part">
          <div className="menu-bar">
            <RxHamburgerMenu size={24} className="toggle-menubar" onClick={toggleSidebar} />
          </div>
          <form className="search-box">
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
          </form>
          <div className="message-profile">
            <div className="notification">
              <Link to="#">
                <span className="notify-icon">
                  <RiNotification2Line size={20} />
                </span>
              </Link>
              <Link to="#">
                <span className="message-icon">
                  <RiMessage2Line size={20} />
                </span>
              </Link>
            </div>
            <div className="user-menu">
              <RiAccountCircleLine size={42} className="picture" onClick={handleMenuToggle} />
              {showMenu && (
                <div className="dropdown-menu">
                  <li><RiUser3Line size={22}/><Link to="/profile">Profile</Link></li>
                  <li><RiLogoutBoxLine size={22}/><a href="#" onClick={handleLogout}>Logout</a></li>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
