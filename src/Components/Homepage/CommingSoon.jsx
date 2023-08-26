import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/CommingSoon.css'

const CommingSoon = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Commingsoon");
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error Occured", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3">
            <div className="card mb-3 w-75 movie-card">
              <img
                src={movie.Image}
                alt={movie.Name}
                className="card-img-top movie-image"
              />
            </div>
            <div>
              <h5 className="fw-bold">{movie.Name}</h5>
              <p >{movie.ReleaseDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommingSoon;
