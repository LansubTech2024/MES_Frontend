import BarChart from '../../Components/Chart/Barchart.jsx'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import "./Home.css";
import Piechart from "../../Components/Chart/Piechart";
import Linechart from "../../Components/Chart/Linechart";

const Home = () => {
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
            <Piechart/>
          </div>
          <div>
            <Linechart/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;