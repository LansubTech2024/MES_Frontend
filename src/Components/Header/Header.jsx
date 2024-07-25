import "./Header.css";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-part">
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
          <div className="header-heading">
            <h3 className="heading">Manufacturing</h3>
          </div>
          <div className="message-profile">
            <div className="notification">
              <Link href="#">
                <i className="fa-regular fa-bell"></i>
              </Link>
              <Link href="#">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </Link>
            </div>
            <div className="profile">
              <RiAccountCircleLine size={42} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
