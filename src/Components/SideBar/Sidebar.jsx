import React from 'react'
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div>
      <aside className='sidebar'>
        <nav>
            <ul className='list-item'>
                <li>
                    <a href='#'>Overview</a>
                </li>
                <li>
                    <a href='#'>Production</a>
                </li>
                <li>
                    <a href='#'>Maintenance</a>
                </li>
                <li>
                    <a href='#'>Inventory</a>
                </li>
                <li>
                    <a href='#'>Reports</a>
                </li>
                <li>
                    <a href='#'>Settings</a>
                </li>
            </ul>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar
