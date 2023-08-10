import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import CustomNavbar from './Components/User/CustomNavbar';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <CustomNavbar/>
      <Routes>
        <Route path="/register" element={<Register/>} />
      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
