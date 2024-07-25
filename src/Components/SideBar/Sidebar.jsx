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
        <nav>
          <ul className="list-item">
            <li>
              <a href="#">
              <i className="fa-solid fa-gauge-high"></i>Overview
              </a>
            </li>
            <li>
              <a href="#">
              <i className="fa-solid fa-gears"></i>Production
              </a>
            </li>
            <li>
              <a href="#">
              <i className="fa-solid fa-wrench"></i>Maintenance
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-boxes"></i>Inventory
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-file-lines"></i>Reports
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-clipboard-check"></i>Quality Control
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-truck"></i>Supply Chain
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-bolt"></i>Energy Consumption
              </a>
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-cog"></i>Settings
                {settingOpen ?(
                  <RxChevronUp
                  onClick={CloseSetting}
                  />
                ):
                (
                 <RxChevronDown 
                 onClick={ToggleSetting}/>
                )}
              </Link>
              {settingOpen && (
                <div className="setting-item">
                    <ul className="setting-list-items">
                        <li>
                            <Link href='#'>User Management</Link>
                        </li>
                        <li>
                            <Link href='#'>Notifications</Link>
                        </li>
                        <li>
                            <Link href='#'>Preferences</Link>
                        </li>
                        <li>
                            <Link href='#'>Security</Link>
                        </li>
                    </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="#">
                <i className="fa-solid fa-question-circle"></i>
                Help and Support
                {helpOpen ?(
                    <RxChevronUp
                    onClick={CloseHelp}
                    />
                )
                :
                (
                    <RxChevronDown
                    onClick={ToggleHelp}
                    />
                )}
              </Link>
              {helpOpen && (
                <div className="help-items">
                    <ul>
                        <li>
                            <Link href='#'>User Guide</Link>
                        </li>
                        <li>
                            <Link href='#'>FAQ</Link>
                        </li>
                        <li>
                            <Link href='#'>Contact Support</Link>
                        </li>
                        <li>
                            <Link href='#'>Feedback</Link>
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
