import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import '../styles/Homepage.css'

const MovieList = () => {
    const [card, setCard] = useState([]);

    useEffect(() => {
        fetchdetails();
    }, []);

    const fetchdetails = async () => {
        const response = await axios.get('http://localhost:4000/HindiMovies');
        const hindi = response.data;
        setCard(hindi);
    };

    return (
        <div className="container">
            <strong><h2 id='title' className="mt-2">Recommended Movies</h2></strong>
            <div className="row mt-2">
                {card.map((movies) => (
                    <div key={movies.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                        <Link to={`/movie/${movies.Name}`} className="card-link" style={{textDecoration:"none" , color:"black"}}> 
                            <Card className="movie-card mb-2" >
                                <CardImg src={movies.image} id="movie-card"></CardImg>
                            </Card>
                            <strong><h5 id='name'>{movies.Name}</h5></strong>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;



export const moviedisplay =() =>
{

}

