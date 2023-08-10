import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';
import SeatLayout from './components/SeatRoom/SeatLayout';
import Navbar from './components/Navbar/Navbar';


function App() {


  return (
    <div className="App">
  

      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/Authentication" element={<Register/>} />
        <Route path='/seatlayout' element={<SeatLayout/>} />
      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
