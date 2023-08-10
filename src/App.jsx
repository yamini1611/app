import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import SeatLayout from './Components/SeatRoom/SeatLayout';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <CustomNavbar/>
      <Routes>
        <Route path="/Authentication" element={<Register/>} />
        <Route path="/SeatLayout" element={< SeatLayout/>} />

      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
