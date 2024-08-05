import {useState} from "react";
import { Link } from "react-router-dom";
import { RxChevronUp,RxChevronDown } from "react-icons/rx";
import Dropdown from "../Dropdown/Dropdown";
import "./Sidebar.css";

const Sidebar = () => {
    const[settingOpen,setSettingOpen] = useState(false);
    const[helpOpen,setHelpOpen] = useState(false)
    const[toggle,setToggle] = useState(false);
    const[dataOpen,setDataOpen] = useState(false);

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
    const ToggleData = () =>{
      setDataOpen(!dataOpen)
    }
    const CloseData = () =>{
      setDataOpen(false)
    }
  return (
      <aside className={`no-scrollbar sidebar ${toggle ? "active" : ""}`} >
        <nav className="sidebar-menu">
          <ul className="list-item">
            <li>
              <Link to="/">
              <i className="fa-solid fa-house-chimney"></i><span>Home</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
              <i className="fa-solid fa-gears"></i><span>Get Data</span>
              {dataOpen ?(
                  <RxChevronUp
                  onClick={CloseData}
                  className="drop-icon"
                  size={24}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleData}
                 className="drop-icon"
                 size={24}
                 />
                )}
              </Link>
              {dataOpen &&(
                 <Dropdown/>
              )}
            </li>
            <li>
              <Link href="#">
              <i className="fa-solid fa-wrench"></i><span>Energy Monoitoring</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-boxes"></i><span>Employee Allocations</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-file-lines"></i><span>Job Timeline</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard'>
                <i className="fa-solid fa-clipboard-check"></i><span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/predection">
                <i className="fa-solid fa-file-lines"></i><span>Predictive Analysis</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="item">
                <i className="fa-solid fa-cog"></i><span>Settings</span>
                {settingOpen ?(
                  <RxChevronUp
                  onClick={CloseSetting}
                  className="drop-icon"
                  size={24}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleSetting}
                 className="drop-icon"
                 size={24}
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
                <span>Help and Support</span>
                {helpOpen ?(
                    <RxChevronUp
                    onClick={CloseHelp}
                    className="drop-icon"
                    size={24}
                    />
                )
                :
                (
                    <RxChevronDown
                    onClick={ToggleHelp}
                    className="drop-icon"
                    size={24}
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
          <div
          className={`nav-toggle ${
            toggle ? "active" : ""
          }`}
          onClick={() => setToggle(!toggle)}
        >
          <div className={`toggle-menu ${toggle ? "active" : " "}`}></div>
        </div>
        </nav>
      </aside>
  )
};

export default Sidebar;
