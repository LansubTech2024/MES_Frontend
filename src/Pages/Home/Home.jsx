import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import "./Home.css";


const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">
        <div className="main-content">
        </div>
      </main>
    </>
  );
};

export default Home;
