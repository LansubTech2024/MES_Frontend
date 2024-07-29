import "./Header.css";
import { RiAccountCircleLine,RiMessage2Line,RiNotification2Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {

  const handleToggleSideBar = ()=>{
     document.body.classList.toggle('toggle-menu')
  }
  return (
    <>
      <header className="header">
        <div className="header-part">
          <div className="menu-bar">
             <RxHamburgerMenu size={24} className="toggle-menu" onClick={handleToggleSideBar}/>
          </div>
          <div className="header-heading">
            <h3 className="heading">Manufacturing</h3>
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
              <Link href="#">
                <span className="notify-icon">
                  <RiNotification2Line size={20}/>
                </span>
              </Link>

              <Link href="#">
                <span className="message-icon">
                  <RiMessage2Line size={20}/>
                </span>
              </Link>
            </div>
            <div className="profile">
              <span className="user">
              <span className="user-name">Thomas Anree</span><br/>
              <span className="user-role">UX Designer</span>
              </span>
              <RiAccountCircleLine size={42} className="picture" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
