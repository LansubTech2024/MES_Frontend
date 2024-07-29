import "./App.css";
import './App.css';
import Home from './Pages/Home/Home';
import Production from "./Pages/Production/Production";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/production" element={<Production/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App;
