import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import Logo from '../../../public/logopng.png'
import { Link } from 'react-router-dom';
import "./Home.css";


const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main">
        <div className="main-content">
          <img src={Logo} alt='home-logo'/>
        </div>
      </main>
    </>
  );
};

export default Home;
