import "./App.css";
import Home from './Pages/Home/Home';
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App;
