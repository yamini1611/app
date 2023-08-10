import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';
import SignIn from './components/Authentication/SignIn';
import CustomNavbar from './components/Navbar/CustomNavbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/Authentication" element={<Register/>} />
      </Routes>
    
      </BrowserRouter>

    </div>
  );
}

export default App;
