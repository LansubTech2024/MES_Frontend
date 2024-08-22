import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'
import Logo from '../../../public/logopng.png'
import { RiLinkedinBoxLine } from 'react-icons/ri';
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
          <div className='social-contact'>
            <Link to='#'><RiLinkedinBoxLine size={22}/> Linedin Profile</Link>
            
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
