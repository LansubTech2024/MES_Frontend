
import { useState } from 'react';
import Popup from '../../Components/Popup/Popup';
import './Dropdown.css'

const Dropdown = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDropdownClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-menu">
        <a href="#" onClick={handleDropdownClick}>From SQL Server Database</a>
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dropdown;
