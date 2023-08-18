
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import CustomNavbar from './Components/Navbar/CustomNavbar';
import UserContext from './Components/Google/GSI';
import GSI from './Components/Google/GSI';
import MovieList from './Components/Homepage/Homepage';
import Theater from './Components/SeatRoom/Theater';
import Moviedisplay from './Components/Homepage/Homedisplay';
import { ToastContainer } from 'react-toastify';
import ChooseTickets from './Components/SeatRoom/ChooseTickets';
import Movie from './Components/Homepage/Movie';
import Next from './Components/Payment/Next';
import PaymentSummary from './Components/Payment/PaymentSummary';
import { Tamildisplay, Malayalamdisplay, Telugudisplay } from './Components/Homepage/Movie';
import ThetreList from './Components/Thetres/ThetreList';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/Tamilmovies/:id" element={<Tamildisplay />} />
          <Route path="/MalayalamMovies/:id" element={<Malayalamdisplay />} />
          <Route path="/TeluguMovies/:id" element={<Telugudisplay />} />
          <Route path="/movie/:id" element={<Moviedisplay />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ChooseTickets" element={< ChooseTickets />} />
          <Route path="/Theater" element={<Theater />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ThetreList" element={<ThetreList />} />
          <Route path="/Next" element={<Next />} />
          <Route path="/PaymentSummary" element={<PaymentSummary />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
