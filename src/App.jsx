import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';
import SignIn from './components/Authentication/SignIn';
import CustomNavbar from './components/User/CustomNavbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <CustomNavbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
