import { useEffect, useState } from 'react';
import axios from 'axios';

function DataTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the Flask API when the component mounts
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <div>
            <h2>Data from SQL Database</h2>
            <table>
                <thead>
                    <tr>
                        {/* Adjust column headers according to your data */}
                        <th>ID</th>
                        <th>CHW_IN_TEMP</th>
                        <th>CHW_OUT_TEMP</th>
                        <th>COW_IN_TEMP</th>
                        <th>COW_OUT_TEMP</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.ID}</td>
                            <td>{item.CHW_IN_TEMP}</td>
                            <td>{item.CHW_OUT_TEMP}</td>
                            <td>{item.COW_IN_TEMP}</td>
                            <td>{item.COW_OUT_TEMP}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
