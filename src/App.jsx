import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import SeatLayout from './Components/SeatRoom/SeatLayout';
import UserContext from './Components/Google/GSI';
import GSI from './Components/Google/GSI';

function App() {

  return (
    <div className="App">
<GSI>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/SeatLayout" element={< SeatLayout />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>

      </BrowserRouter>
      </GSI>
    </div>
  );
}

export default App;
