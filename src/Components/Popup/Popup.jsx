
import  { useState } from 'react';
import axios from 'axios';
import './Popup.css';

const Popup = ({ onClose }) => {
  const [serverName, setServerName] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [data, setData] = useState([]);

  const handleOk = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/data', {
        serverName,
        databaseName,
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Connect to SQL Server</h2>
        <input
          type="text"
          placeholder="Server Name"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Database Name"
          value={databaseName}
          onChange={(e) => setDatabaseName(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleOk}>OK</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Popup;
