
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import UserContext from './Components/Google/GSI';
import GSI from './Components/Google/GSI';
import MovieList from './Components/Homepage/Homepage';
import Theater from './Components/SeatRoom/Theater';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path='/' element={<MovieList />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/Theater" element={< Theater />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
