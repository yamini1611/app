import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import card1 from "../Assets/Images/card1.png";
import card2 from "../Assets/Images/card2.png";
import card3 from "../Assets/Images/card3.png";
import leo from "../Assets/Images/leo .jpeg";

const MovieList = () => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/HindiMovies");
      setCard(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
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
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              id="he"
              src="https://assets-in.bmscdn.com/promotions/cms/creatives/1692782664021_kingofkothadesktop.jpeg"
              className="d-block w-100  h-100"
              alt="..."
            ></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              id="he"
              src="https://assets-in.bmscdn.com/promotions/cms/creatives/1692952754373_iccworldcupdesktop.jpg"
              className="d-block w-100 h-100"
              alt="..."
            ></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              id="he"
              src="https://assetscdn1.paytm.com/images/catalog/view_item/1888844/1691145171657.jpg?format=webp"
              className="d-block w-100 h-100"
              alt="..."
            ></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              id="he"
              src="https://assets-in.bmscdn.com/promotions/cms/creatives/1690629469326_webbannernpa.jpg"
              className="d-block w-100 h-100"
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
     <Link to='/WorldHome'> <img
        src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/icc-cwc-banner-collection-202308220156.png"
        alt="Banner"
        className="d-block w-100 mt-3"
      /></Link>

      <h2 id="bh" className="p-0 p-md-5 my-2">
        Unlock Your Cinema Adventure: Where Every Click Becomes a Front-Row Seat
        to Excitement!
      </h2>
      
      <div className="d-flex justify-content-center align-items-center pb-4">
        <Link to='/commingsoon' className="btn btn-danger">Coming Soon</Link>
      </div>

      < div className="row justify-content-evenly">
        <div className="col-5 col-lg-4 text-center">
          <Card className="movie-card">
            <CardImg src={card1}></CardImg>
          </Card>
        </div>

        <div className="col-5 col-lg-4">
          <Card className="movie-card">
            <CardImg src={card2}></CardImg>
          </Card>
        </div>

        <div className="col-5 col-lg-4 mt-4 mt-lg-0">
          <Card className="movie-card">
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
            <Link
              to={`/movie/${movies.id}`}
              className="card-link"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card className="movie-card mb-2">
                <CardImg src={movies.image} id="movie-card"></CardImg>
              </Card>
              <strong>
                <h5 id="name">{movies.Name}</h5>
              </strong>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
