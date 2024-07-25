import "./Header.css";
import { RiAccountCircleLine } from "react-icons/ri";

const Header = () => {
  return (

    <>
    <header className="header">
      <div className="header-part">
        <form className="search-box">
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" name="query" id="query" className="search" placeholder="Type to search..."/>
        </form>
        <div className="header-heading">
          <h3 className="heading">Manufacturing</h3>
        </div>
        <div className="message-profile">
          <div className="notification">
          <i className="fa-regular fa-bell fa-2x"></i>
          </div>
          <div className="profile">
            <RiAccountCircleLine size={42}/>
          </div>
        </div>
      </div>
    </header>
    </>
     
    // <div className="header">
    //   <div className="dashboard-tilte">
    //     <h2>Manufacturing Dashboard</h2>
    //   </div>
    //   <div className="Search-bar">
    //     <input type="text" placeholder="Search..."></input>
    //   </div>
    //   <div>
    //     <div className="Notification">
    //     <i className="fa-regular fa-bell fa-2x"></i>
    //   </div>
    //   <div className="User Profile">
    //     <svg
    //       className="w-6 h-6 text-gray-800 dark:text-white"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="40"
    //       height="40"
    //       fill="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         fill-rule="evenodd"
    //         d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
    //         clip-rule="evenodd"
    //       />
    //     </svg>
    //   </div>

    // </div>
    // </div>
  );
};

export default Header;
