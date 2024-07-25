import BarChart from '../../Components/Chart/Barchart.jsx'
import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/SideBar/Sidebar'

const Home = () => {
  return (
    <>
    <Header/>
        <Sidebar/>
    <main className='main'>
        <div className='main-content'>
            <div className='barchart'>
                <BarChart/>

            </div>
        </div>
    </main>
    </>
  )
}

export default Home