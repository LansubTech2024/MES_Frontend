import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { RiAccountCircleLine, RiMessage2Line, RiLogoutBoxLine, RiUser3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from '../../../public/logo3.png';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  const navigate = useNavigate();

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
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <header className="header">
      <div className = "company-name-header">
              <p>Vivarthi</p>
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
                <span className="message-icon">
                  <RiMessage2Line size={20} />
                </span>
              </Link>
            </div>
            <div className="user-menu">
              <RiAccountCircleLine size={42} className="picture" onClick={handleMenuToggle} />
              {showMenu && (
                <div className="dropdown-menu">
                  <li><RiUser3Line className="profile-img" size={22}/><Link to="/profile">Profile</Link></li>
                  <li><RiLogoutBoxLine size={22}/><a href="#" onClick={handleLogout}>Logout</a></li>
                </div>
              )}
            </div>
          </div>
      </header>
    </>
  );
};

export default Header;
