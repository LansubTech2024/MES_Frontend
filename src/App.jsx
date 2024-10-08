import "./App.css";
import Home from './Pages/Home/Home';
import HelpandSupport from "./Pages/HelpandSupport/HelpandSupport";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import About from "./Pages/About/About";
import GetData from "./Pages/GetData/GetData";
import Profile from"./Pages/Profile/Profile";
import Temperature from './Pages/Temperature/Temperature';
import Pressure from './Pages/Pressure/Pressure';
import OEEData from './Pages/OEEData/OEEData';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ForgetPassword from "./Forgetpassword/Forgetpassword";
import ResetPassword from "./Resetpassword/Resetpassword";


const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/get-data" element={<GetData/>}/>
        <Route path="/help" element={<HelpandSupport/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/temperature" element={<Temperature/>}/>
        <Route path="/pressure" element={<Pressure/>}/>
        <Route path="/oee-data" element={<OEEData/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
