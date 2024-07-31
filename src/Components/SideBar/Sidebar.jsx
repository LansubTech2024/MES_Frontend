import {useState} from "react";
import { Link } from "react-router-dom";
import { RxChevronUp,RxChevronDown } from "react-icons/rx";
import "./Sidebar.css";

const Sidebar = () => {
    const[settingOpen,setSettingOpen] = useState(false);
    const[helpOpen,setHelpOpen] = useState(false)

    const ToggleSetting = () =>{
        setSettingOpen(!settingOpen);
    }
    const CloseSetting = () =>{
        setSettingOpen(false)
    }
    const ToggleHelp = () =>{
        setHelpOpen(!helpOpen)
    }
    const CloseHelp = () =>{
        setHelpOpen(false)
    }
  return (
      <aside className="sidebar no-scrollbar">
        <nav className="sidebar-menu">
          <ul className="list-item">
            <li>
              <Link to="/">
              <i className="fa-solid fa-house-chimney"></i>Home
              </Link>
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-gears"></i>Data from Machines
              </Link>
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-wrench"></i>Energy Monoitoring
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-boxes"></i>Employee Allocations
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-file-lines"></i>Job Timeline
              </Link>
            </li>
            <li>
              <Link to='/dashboard'>
                <i className="fa-solid fa-clipboard-check"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link to="/" className="item">
                <i className="fa-solid fa-cog"></i>Settings
                {settingOpen ?(
                  <RxChevronUp
                  onClick={CloseSetting}
                  className="drop-icon"
                  size={22}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleSetting}
                 className="drop-icon"
                 size={22}
                 />
                )}
              </Link>
              {settingOpen && (
                <div className="setting-item">
                    <ul className="setting-list-items">
                        <li>
                            <Link href='#' className="set-item">User Management</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Notifications</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Preferences</Link>
                        </li>
                        <li>
                            <Link href='#' className="set-item">Security</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/" className="item">
                <i className="fa-solid fa-question-circle"></i>
                Help and Support
                {helpOpen ?(
                    <RxChevronUp
                    onClick={CloseHelp}
                    className="drop-icon"
                    size={40}
                    />
                )
                :
                (
                    <RxChevronDown
                    onClick={ToggleHelp}
                    className="drop-icon"
                    size={40}
                    />
                )}
              </Link>
              {helpOpen && (
                <div className="help-items">
                    <ul className="help-list-items">
                        <li>
                            <Link href='#' className="help-item">User Guide</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">FAQ</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">Contact Support</Link>
                        </li>
                        <li>
                            <Link href='#' className="help-item">Feedback</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </aside>
  )
};

export default Sidebar;
