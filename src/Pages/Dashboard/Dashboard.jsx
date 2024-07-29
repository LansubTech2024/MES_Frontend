import BarChart from '../../Components/Chart/Barchart.jsx'
import Header from '../../Components/Header/Header.jsx'
import Sidebar from '../../Components/SideBar/Sidebar.jsx'
import "./Dashboard.css";
import Piechart from "../../Components/Chart/Piechart.jsx";
import Linechart from "../../Components/Chart/Linechart.jsx";
import DataTable from '../../Components/Table/DataTable.jsx';


const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">
        <div className="main-content">
          <div className="barchart">
            <BarChart />
          </div>
          <div className="piechart">
            <Piechart />
          </div>
          <div className="linechart">
            <Linechart/>
          </div>
          <div className="datatable">
            <DataTable/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
