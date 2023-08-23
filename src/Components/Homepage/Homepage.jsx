import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import card1 from "../Assets/Images/card1.png";
import card2 from "../Assets/Images/card2.png";
import card3 from "../Assets/Images/card3.png";

const MovieList = ({ user }) => {
  const [card, setCard] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchdetails();
  }, []);

  const fetchdetails = async () => {
    const response = await axios.get("http://localhost:4000/HindiMovies");
    const hindi = response.data;
    setCard(hindi);
  };

  const handleNewMovieChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const addMovie = async () => {
    try {
      await axios.post("http://localhost:4000/HindiMovies", newMovie);
      fetchdetails();
      setNewMovie({
        name: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://localhost:4000/HindiMovies/${movieId}`);
      fetchdetails();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="container mb-5" id="hp">
        <div
        id="carouselExampleInterval"
        className="carousel slide mt-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1000">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/1888844/1691145171657.jpg?format=webp"
              height={250}
              className="d-block w-100"
              alt="..."
            ></img>
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="https://assetscdn1.paytm.com/images/catalog/view_item/1848846/1690370823227.jpg?format=webp"
              height={250}
              className="d-block w-100"
              alt="..."
            ></img>
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.oSsrIfvPchC5q9ICjbIWSwHaCu&pid=Api&P=0&h=180"
              height={250}
              className="d-block w-100"
              alt="..."
            ></img>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2 id="bh" className="p-5">
        Unlock Your Cinema Adventure: Where Every Click Becomes a Front-Row Seat
        to Excitement!
      </h2>

      <div className="row">
        <div className="col">
          <Card className="movie-card mb-2">
            <CardImg src={card1}></CardImg>
          </Card>
        </div>

        <div className="col">
          <Card className="movie-card mb-2">
            <CardImg src={card2}></CardImg>
          </Card>
        </div>

        <div className="col">
          <Card className="movie-card mb-2">
            <CardImg src={card3}></CardImg>
          </Card>
        </div>
      </div>

      <strong>
        <h2 id="title" className="mt-2">
          Recommended Movies
        </h2>
      </strong>

      <div className="row mt-2">
        {card.map((movies) => (
          <div key={movies.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
            <Card className="movie-card mb-2">
              <CardImg src={movies.image} id="movie-card"></CardImg>
              <div className="mt-2 text-center">
                <strong style={{fontFamily:"Work Sans, sans-serif"}}>{movies.Name}</strong>
                {user && user.role === "admin" && (
                  <div>
                    <button
                      className="btn btn-danger mt-1"
                      onClick={() => handleDeleteMovie(movies.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {user && user.role === "admin" && (
        <button
          className="btn btn-primary mt-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Movie"}
        </button>
      )}

      {showForm && (
        <div className="mt-5">
          <h3>Add New Movie</h3>
          <div className="mb-3">
            <label htmlFor="movieName" className="form-label">
              Movie Name
            </label>
            <input
              type="text"
              className="form-control text-black"
              id="movieName"
              name="name"
              value={newMovie.name}
              onChange={handleNewMovieChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageURL" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control text-black"
              id="imageURL"
              name="image"
              value={newMovie.image}
              onChange={handleNewMovieChange}
            />
          </div>
          <button className="btn btn-primary" onClick={addMovie}>
            Add Movie
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
