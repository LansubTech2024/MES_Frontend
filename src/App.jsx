import "./App.css";
import Home from './Pages/Home/Home';
import Predective from "./Pages/Predective/Predective";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import About from "./Pages/About/About";
import GetData from "./Pages/GetData/GetData";
import Profile from"./Pages/Profile/Profile";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/get-data" element={<GetData/>}/>
        <Route path="/predection" element={<Predective/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
