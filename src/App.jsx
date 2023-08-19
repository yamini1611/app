import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Authentication/Register";
import SignIn from "./Components/Authentication/SignIn";
import CustomNavbar from "./Components/Navbar/CustomNavbar";
import UserContext from "./Components/Google/GSI";
import GSI from "./Components/Google/GSI";
import MovieList from "./Components/Homepage/Homepage";
import Theater from "./Components/SeatRoom/Theater";
import Moviedisplay from "./Components/Homepage/Homedisplay";
import { ToastContainer } from "react-toastify";
import ChooseTickets from "./Components/SeatRoom/ChooseTickets";
import Movie from "./Components/Homepage/Movie";
import Next from "./Components/Payment/Next";
import Footer from "./Components/Footer/Footer";
import Ticket from "./Components/Payment/Ticket";
import Trailer from "./Components/Homepage/Trailer";
import { Tamildisplay,
Malayalamdisplay,
  Telugudisplay,
} from "./Components/Homepage/Movie";
import ThetreList from "./Components/Thetres/ThetreList";
import SelectedTheaters from "./Components/Thetres/SelectedTheatres";
import PasswordReset from "./Components/Authentication/PasswordReset";
import { TamilTrailer ,MalayalamTrailer ,TeluguTrailer} from "./Components/Homepage/Trailer";
import ChooseTamilmovie from "./Components/Thetres/ChoosenMovie";
import { ChooseHindiMovie } from "./Components/Thetres/ChoosenMovie";
import { Hindidisplay } from "./Components/Homepage/Movie";
import { ChooseTelugumovie } from "./Components/Thetres/ChoosenMovie";
import { ChooseMalayalmmovie } from "./Components/Thetres/ChoosenMovie";
import BookingSummary from "./Components/BookingSummary/BookingSummary";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/Trailer/:id" element={<Trailer />} />
          <Route path="/TamilTrailer/:id" element={<TamilTrailer />} />
          <Route path="/MalayalamTrailer/:id" element={<MalayalamTrailer />} />
          <Route path="/TeluguTrailer/:id" element={<TeluguTrailer />} />
          <Route path="/Tamilmovies/:id" element={<Tamildisplay />} />
          <Route path="/MalayalamMovies/:id" element={<Malayalamdisplay />} />
          <Route path="/TeluguMovies/:id" element={<Telugudisplay />} />
          <Route  path="/HindiMovies/:id" element={<Hindidisplay />}/>
          <Route path="/movie/:id" element={<Moviedisplay />} />
          <Route path="/Choosenmovie/:id" element={<ChooseTamilmovie />} />
          <Route path="/ChoosenHindimovie/:id" element={<ChooseHindiMovie />} />
          <Route path="/ChoosenTelugumovie/:id" element={<ChooseTelugumovie />} />
          <Route path="/ChoosenMalayalammovie/:id" element={<ChooseMalayalmmovie />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ChooseTickets" element={< ChooseTickets />} />
          <Route path="/Theater" element={<Theater />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/ThetreList" element={<ThetreList />} />
          <Route path="/show" element={<SelectedTheaters />} />
          <Route path="/forgot-password" element={<PasswordReset />} />
          <Route path="/BookingSummary" element={<BookingSummary />} />

          {/* // */}
          <Route path="/Next" element={<Next />} />
          <Route path="/Ticket" element={<Ticket/>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
