import "./App.css";
import './App.css';
import Home from './Pages/Home/Home';
import { BrowserRouter,Routes,Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App;
