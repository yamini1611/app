import React, { useState, useEffect } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
const Movie = () => {
    const [hindi, setHindi] = useState([]);
    const [Tamil, setTamil] = useState([]);
    const [Telugu, setTelugu] = useState([]);
    const [Malayalam, setMalayalam] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState(""); // State for language filter
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        // Fetch data for each language
        const response1 = await axios.get("http://localhost:4000/HindiMovies");
        setHindi(response1.data);

        const response2 = await axios.get("http://localhost:4000/TamilMovies");
        setTamil(response2.data);

        const response3 = await axios.get("http://localhost:4000/TeluguMovies");
        setTelugu(response3.data);

        const response4 = await axios.get(
            "http://localhost:4000/MalayalamMovies"
        );
        setMalayalam(response4.data);
    };

    const filteredMovies = (language, location) => {
        let filteredByLocation = [];

        switch (location) {
            case "Chennai":
                filteredByLocation = Tamil;
                break;
            case "Mumbai":
                filteredByLocation = hindi;
                break;
            case "Hyderabad":
                filteredByLocation = Telugu;
                break;
            case "Cochin":
                filteredByLocation = Malayalam;
                break;
            default:
                filteredByLocation = [...Tamil, ...hindi, ...Telugu, ...Malayalam];
                break;
        }

        if (language) {
            return filteredByLocation.filter(movie => movie.language === language);
        } else {
            return filteredByLocation;
        }
    }
    

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    const handleLanguageClick = (language) => {
        setSelectedLanguage(language);
    };
const getMovieLink = (language, location, movieId) => {
    switch (language) {
        case "Hindi":
            return `/movie/${movieId}`;
        case "Tamil":
            return `/Tamilmovies/${movieId}`;
        case "Telugu":
            return `/TeluguMovies/${movieId}`;
        case "Malayalam":
            return `/MalayalamMovies/${movieId}`;
        default:
            return `/movie/${movieId}`;
    }
};
const renderMovieCards = (movies) => {
    
    const filteredMoviesByLanguage = selectedLanguage
        ? movies.filter(movie => movie.language === selectedLanguage)
        : movies;

    return filteredMoviesByLanguage.map((movie) => (
        <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
            <Link
                to={getMovieLink(movie.language, selectedLocation, movie.id)}
                className="card-link"
                style={{ textDecoration: "none", color: "black" }}
            >
                <Card className="movie-card mb-2">
                    <CardImg src={movie.image} id="movie-card"></CardImg>
                </Card>
                <strong>
                    <h5 id="name">{movie.Name}</h5>
                </strong>
            </Link>
        </div>
    ));
};

    
    const filteredMovieCards = filteredMovies(selectedLanguage, selectedLocation);


    return (
        <div className="container">
            <div>
                {/* Location filter buttons */}
                <button
                    className={`btn ${
                        selectedLocation === "Chennai"
                            ? "btn-primary"
                            : "btn-light"
                    }`}
                    onClick={() => handleLocationClick("Chennai")}
                >
                    Chennai
                </button>
                <button
                    className={`btn ${
                        selectedLocation === "Mumbai"
                            ? "btn-primary"
                            : "btn-light"
                    }`}
                    onClick={() => handleLocationClick("Mumbai")}
                >
                    Mumbai
                </button>
                <button
                    className={`btn ${
                        selectedLocation === "Hyderabad"
                            ? "btn-primary"
                            : "btn-light"
                    }`}
                    onClick={() => handleLocationClick("Hyderabad")}
                >
                    Hyderabad
                </button>
                <button
                    className={`btn ${
                        selectedLocation === "Cochin"
                            ? "btn-primary"
                            : "btn-light"
                    }`}
                    onClick={() => handleLocationClick("Cochin")}
                >
                    Cochin
                </button>
            </div>
         
            {/* Render filtered movie cards */}
            <strong>
                <h2 id="title" className="mt-2">
                    {selectedLanguage} Movies
                </h2>
            </strong>
            <div className="row mt-2">
                {renderMovieCards(filteredMovieCards)}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Movie;


export const Tamildisplay = () =>
{
    const [Tamil, settamil] = useState([]);
    
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const handleRatingClick = (value) => {
        setRating(value);
    };
    useEffect(() =>
    {
        fetch(`http://localhost:4000/TamilMovies/${id}`)
        .then((response) =>response.json())
        .then((data) =>settamil(data))
        .catch((error) => console.error("Error fetching data:", error));
    })
    axios
    .get(`http://localhost:4000/ratingreviews?movieId=${id}`)
    .then((response) => {
        setReviews(response.data);
    })
    .catch((error) => {
        console.error("Error fetching reviews:", error);
    });

const handleRateSubmit = () => {
    const review = document.querySelector('.input-form').value;

    const data = {
        movieId: id,
        rating: rating,
        review: review
    };

    axios.post("http://localhost:4000/ratingreviews", data)
        .then((response) => {
            toast.success("Review submitted:", response.data);
        })
        .catch((error) => {
            console.error("Error submitting review:", error);
        });
    document.querySelector(".input-form").value = "";
    setRating(0);
};
const renderRatingStars = (value) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
        starArray.push(
            <i
                key={i}
                className={`fas fa-star ${i <= value ? "gold" : "gray"}`}
            ></i>
        );
    }
    return starArray;
};
    return (
        <div>
            <div className=" pt-2" id='bg' style={{paddingBottom:50}}>
                <div className="container" id='con' >

                    <div className="row mt-3 " >

                        <div key={Tamil.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Tamil.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <strong><h2 className="mt-5">{Tamil.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt=""></img></strong>
                                </div>
                                <div className="col">
                                    <h2 style={{ fontSize: 25 }}>{Tamil.Rating}</h2>

                                </div>

                                <h2 style={{ fontSize: 21 }}>Add your rating & review  <button className="btn btn-light mt-2" data-bs-toggle="modal" data-bs-target="#rating">Rate Now</button></h2>
                                <div className="modal fade" id="rating" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Rate & Review</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>

                                                    <h5 style={{ color: "black" }}>Select your rating:</h5>
                                                    <span className="rating-stars">
                                                        <i className={`fas fa-star ${rating >= 1 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(1)}></i>
                                                        <i className={`fas fa-star ${rating >= 2 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(2)}></i>
                                                        <i className={`fas fa-star ${rating >= 3 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(3)}></i>
                                                        <i className={`fas fa-star ${rating >= 4 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(4)}></i>
                                                        <i className={`fas fa-star ${rating >= 5 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(5)}></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h5 style={{ color: "black" }}>Enter Review:</h5>
                                                    <textarea className="input-form"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-dark" onClick={handleRateSubmit} data-bs-dismiss="modal">
                                                    Rate
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-9">
                                        <h2 style={{ fontSize: 15 }}>{Tamil.Quality}</h2>

                                    </div>
                                    <div className="col">

                                        <label style={{ fontSize: 16 }} for="language">Select a Language:</label>
                                        <select className="form-select" id="language" name="language"    >
                                            <option value="hindi">Hindi</option>
                                            <option value="tamil">Tamil</option>
                                            <option value="telugu">Telugu</option>
                                            <option value="malayalam">Malayalam</option>
                                            <option value="kannada">Kannada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.duration}</h2>

                                    </div>
                                    <div className="col-8">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.Certificate}</h2>
                                    </div>
                                    <div className="col-6 mt-2 " >
                                  <Link to="/ThetreList">      <button className="btn btn" style={{ backgroundColor: "red", color: "white" }}>BOOK NOW</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 18 }}>{Tamil.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18517.jpg?w=740" alt="" />
                            <strong><span>{Tamil.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Tamil.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/businessman-bearded-work-leadership_18591-5278.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Tamil.Director}</span></strong>
                            <span>Director</span>
                        </div>

                    </div>
                    <hr></hr>
                    <div className="mt-4">
                        <h2 style={{ fontSize: 26, fontWeight: "bolder" }}>TOP REVIEWS</h2>
                        <div className="row">
                          
                            {reviews.map((review) => (
                                  <div className="col">
                <Card key={review.id} className="mb-3" style={{ padding: 25, maxWidth: "400px" }}>
                    <div>
                        <h5>Rating: {renderRatingStars(review.rating)}</h5>
                        <h5>Review: {review.review}</h5>
                    </div>
                </Card>
                </div>
            ))}
                         
                      
                        </div>
                        
                    </div>
                </div>


            </div>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>


    )
}

export const Malayalamdisplay = () =>
{
 
    const [Malayalam, setMalayalam] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const handleRatingClick = (value) => {
        setRating(value);
    };
    useEffect(() =>
    {
        fetch(`http://localhost:4000/MalayalamMovies/${id}`)
        .then((response) =>response.json())
        .then((data) =>setMalayalam(data))
        .catch((error) => console.error("Error fetching data:", error));
    })
    axios
    .get(`http://localhost:4000/ratingreviews?movieId=${id}`)
    .then((response) => {
        setReviews(response.data);
    })
    .catch((error) => {
        console.error("Error fetching reviews:", error);
    });

const handleRateSubmit = () => {
    const review = document.querySelector('.input-form').value;

    const data = {
        movieId: id,
        rating: rating,
        review: review
    };

    axios.post("http://localhost:4000/ratingreviews", data)
        .then((response) => {
            toast.success("Review submitted:", response.data);
        })
        .catch((error) => {
            console.error("Error submitting review:", error);
        });
    document.querySelector(".input-form").value = "";
    setRating(0);
};
const renderRatingStars = (value) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
        starArray.push(
            <i
                key={i}
                className={`fas fa-star ${i <= value ? "gold" : "gray"}`}
            ></i>
        );
    }
    return starArray;
};
    return (
        <div>
            <div className=" pt-2" id='bg' style={{paddingBottom:50}}>
                <div className="container" id='con' >

                    <div className="row mt-3 " >

                        <div key={Malayalam.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Malayalam.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <strong><h2 className="mt-5">{Malayalam.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt=""></img></strong>
                                </div>
                                <div className="col">
                                    <h2 style={{ fontSize: 25 }}>{Malayalam.Rating}</h2>

                                </div>

                                <h2 style={{ fontSize: 21 }}>Add your rating & review  <button className="btn btn-light mt-2" data-bs-toggle="modal" data-bs-target="#rating">Rate Now</button></h2>
                                <div className="modal fade" id="rating" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Rate & Review</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>

                                                    <h5 style={{ color: "black" }}>Select your rating:</h5>
                                                    <span className="rating-stars">
                                                        <i className={`fas fa-star ${rating >= 1 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(1)}></i>
                                                        <i className={`fas fa-star ${rating >= 2 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(2)}></i>
                                                        <i className={`fas fa-star ${rating >= 3 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(3)}></i>
                                                        <i className={`fas fa-star ${rating >= 4 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(4)}></i>
                                                        <i className={`fas fa-star ${rating >= 5 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(5)}></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h5 style={{ color: "black" }}>Enter Review:</h5>
                                                    <textarea className="input-form"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-dark" onClick={handleRateSubmit} data-bs-dismiss="modal">
                                                    Rate
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-9">
                                        <h2 style={{ fontSize: 15 }}>{Malayalam.Quality}</h2>

                                    </div>
                                    <div className="col">

                                        <label style={{ fontSize: 16 }} for="language">Select a Language:</label>
                                        <select className="form-select" id="language" name="language"    >
                                            <option value="hindi">Hindi</option>
                                            <option value="tamil">Tamil</option>
                                            <option value="telugu">Telugu</option>
                                            <option value="malayalam">Malayalam</option>
                                            <option value="kannada">Kannada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.duration}</h2>

                                    </div>
                                    <div className="col-8">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.Certificate}</h2>
                                    </div>
                                    <div className="col-6 mt-2 " >
                                        <button className="btn btn" style={{ backgroundColor: "red", color: "white" }}>BOOK NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 18 }}>{Malayalam.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18517.jpg?w=740" alt="" />
                            <strong><span>{Malayalam.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Malayalam.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/businessman-bearded-work-leadership_18591-5278.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Malayalam.Director}</span></strong>
                            <span>Director</span>
                        </div>

                    </div>
                    <hr></hr>
                    <div className="mt-4">
                        <h2 style={{ fontSize: 26, fontWeight: "bolder" }}>TOP REVIEWS</h2>
                        <div className="row">
                          
                            {reviews.map((review) => (
                                  <div className="col">
                <Card key={review.id} className="mb-3" style={{ padding: 25, maxWidth: "400px" }}>
                    <div>
                        <h5>Rating: {renderRatingStars(review.rating)}</h5>
                        <h5>Review: {review.review}</h5>
                    </div>
                </Card>
                </div>
            ))}
                         
                      
                        </div>
                        
                    </div>
                </div>


            </div>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>


    )
}
export const Telugudisplay = () =>
{
 
    const [Telugu, setTelugu] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const handleRatingClick = (value) => {
        setRating(value);
    };
    useEffect(() =>
    {
        fetch(`http://localhost:4000/TeluguMovies/${id}`)
        .then((response) =>response.json())
        .then((data) =>setTelugu(data))
        .catch((error) => console.error("Error fetching data:", error));
    })
    axios
    .get(`http://localhost:4000/ratingreviews?movieId=${id}`)
    .then((response) => {
        setReviews(response.data);
    })
    .catch((error) => {
        console.error("Error fetching reviews:", error);
    });

const handleRateSubmit = () => {
    const review = document.querySelector('.input-form').value;

    const data = {
        movieId: id,
        rating: rating,
        review: review
    };

    axios.post("http://localhost:4000/ratingreviews", data)
        .then((response) => {
            toast.success("Review submitted:", response.data);
        })
        .catch((error) => {
            console.error("Error submitting review:", error);
        });
    document.querySelector(".input-form").value = "";
    setRating(0);
};
const renderRatingStars = (value) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
        starArray.push(
            <i
                key={i}
                className={`fas fa-star ${i <= value ? "gold" : "gray"}`}
            ></i>
        );
    }
    return starArray;
};
    return (
        <div>
            <div className=" pt-2" id='bg' style={{paddingBottom:50}}>
                <div className="container" id='con' >

                    <div className="row mt-3 " >

                        <div key={Telugu.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Telugu.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <strong><h2 className="mt-5">{Telugu.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt=""></img></strong>
                                </div>
                                <div className="col">
                                    <h2 style={{ fontSize: 25 }}>{Telugu.Rating}</h2>

                                </div>

                                <h2 style={{ fontSize: 21 }}>Add your rating & review  <button className="btn btn-light mt-2" data-bs-toggle="modal" data-bs-target="#rating">Rate Now</button></h2>
                                <div className="modal fade" id="rating" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Rate & Review</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>

                                                    <h5 style={{ color: "black" }}>Select your rating:</h5>
                                                    <span className="rating-stars">
                                                        <i className={`fas fa-star ${rating >= 1 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(1)}></i>
                                                        <i className={`fas fa-star ${rating >= 2 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(2)}></i>
                                                        <i className={`fas fa-star ${rating >= 3 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(3)}></i>
                                                        <i className={`fas fa-star ${rating >= 4 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(4)}></i>
                                                        <i className={`fas fa-star ${rating >= 5 ? 'gold' : 'gray'}`} onClick={() => handleRatingClick(5)}></i>
                                                    </span>
                                                </div>
                                                <div>
                                                    <h5 style={{ color: "black" }}>Enter Review:</h5>
                                                    <textarea className="input-form"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-dark" onClick={handleRateSubmit} data-bs-dismiss="modal">
                                                    Rate
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-9">
                                        <h2 style={{ fontSize: 15 }}>{Telugu.Quality}</h2>

                                    </div>
                                    <div className="col">

                                        <label style={{ fontSize: 16 }} for="language">Select a Language:</label>
                                        <select className="form-select" id="language" name="language"    >
                                            <option value="hindi">Hindi</option>
                                            <option value="tamil">Tamil</option>
                                            <option value="telugu">Telugu</option>
                                            <option value="malayalam">Malayalam</option>
                                            <option value="kannada">Kannada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.duration}</h2>

                                    </div>
                                    <div className="col-8">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.Certificate}</h2>
                                    </div>
                                    <div className="col-6 mt-2 " >
                                        <button className="btn btn" style={{ backgroundColor: "red", color: "white" }}>BOOK NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 18 }}>{Telugu.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18517.jpg?w=740" alt="" />
                            <strong><span>{Telugu.MaleLead}</span></strong>
                            <span>Lead Actor</span>

                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Telugu.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/businessman-bearded-work-leadership_18591-5278.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{Telugu.Director}</span></strong>
                            <span>Director</span>
                        </div>

                    </div>
                    <hr></hr>
                    <div className="mt-4">
                        <h2 style={{ fontSize: 26, fontWeight: "bolder" }}>TOP REVIEWS</h2>
                        <div className="row">
                          
                            {reviews.map((review) => (
                                  <div className="col">
                <Card key={review.id} className="mb-3" style={{ padding: 25, maxWidth: "400px" }}>
                    <div>
                        <h5>Rating: {renderRatingStars(review.rating)}</h5>
                        <h5>Review: {review.review}</h5>
                    </div>
                </Card>
                </div>
            ))}
                         
                      
                        </div>
                        
                    </div>
                </div>


            </div>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>


    )
}
