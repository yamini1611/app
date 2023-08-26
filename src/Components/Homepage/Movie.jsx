import React, { useState, useEffect } from "react";
import { Card, CardImg, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import SelectedTheaters from "../Thetres/SelectedTheatres";
import mumbai from '../Assets/Images/mumbai.png';
import Hydrabad from '../Assets/Images/hydrabad.png';
import Cochin from '../Assets/Images/Cochin.png';
import chennai from '../Assets/Images/chennai.png'
import { useDispatch } from "react-redux";
import { setBookings } from "../ReduxToolKit/counterSlice";
import { useSelector } from "react-redux";
import { selectBookings } from "../ReduxToolKit/counterSlice";

const Movie = () => {
    const [hindi, setHindi] = useState([]);
    const [Tamil, setTamil] = useState([]);
    const [Telugu, setTelugu] = useState([]);
    const [Malayalam, setMalayalam] = useState([]);
    const [chooseMovie, setChooseMovie] = useState([""]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [reviews, setReviews] = useState([]);
    var count;


    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        // Fetch data for each language
        const response1 = await axios.get("http://localhost:4000/HindiMovies");
        setHindi(response1.data);

        const response2 = await axios.get("http://localhost:4000/TamilMovies");
        setTamil(response2.data);

        console.log(response2.data)

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

                count = 1
                filteredByLocation = [...chooseMovie];

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
        if (location) {
            switch (language) {
                case "Hindi":
                    return `/HindiMovies/${movieId}`;
                case "Tamil":
                    return `/Tamilmovies/${movieId}`;
                case "Telugu":
                    return `/TeluguMovies/${movieId}`;
                case "Malayalam":
                    return `/MalayalamMovies/${movieId}`;
                default:
                    return `/movie/${movieId}`;
            }
        }

    };

    const renderMovieCards = (movies) => {
        const filteredMoviesByLanguage = selectedLanguage
        ? movies.filter((movie) => movie.language === selectedLanguage)
        : movies;


        return filteredMoviesByLanguage.map((movie) => (
            <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-2 p-3">
                <Link
                    to={getMovieLink(movie.language, selectedLocation, movie.id)}
                    className="card-link"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                        if (!selectedLocation) {
                            toast.error("Please choose a location first!");

                            return false;
                        }
                        return true;
                    }}
                >
                    {count === 1 && (
                        <h1 className="p-5" style={{ fontFamily: "Work Sans, sans-serif ", width: 800 }}>Choose location first</h1>
                    )}
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
    console.log("Displayed Movies:", filteredMovieCards);


    return (
        <div className="container">
            <div>
                <div className="row">

                    <div className="col-4 mt-2   ">
                        <button id='span' data-bs-toggle="modal" className='btn btn-outline-dark justify-content-end ' data-bs-target="#location" >Choose  Location </button>
                        <div class="modal fade" id="location" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg " style={{ fontFamily: "Work Sans, sans-serif" }}>
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel" style={{ fontWeight: 700 }}>Choose Location</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-center">
                                        <div className="col-12 mt-2" style={{ fontFamily: "Work Sans, sans-serif" }}>
                                            {/* Location filter buttons */}
                                            <button

                                                style={{ borderRadius: 0 }}
                                                className={`btn ${selectedLocation === "Chennai"
                                                    ? "btn-info"
                                                    : "btn-outline-dark"
                                                    }`}
                                                onClick={() => handleLocationClick("Chennai")}
                                                data-bs-dismiss="modal"
                                            >
                                                <img src={chennai} alt=""></img> Chennai
                                            </button>
                                            <button

                                                style={{ borderRadius: 0 }}
                                                className={`btn ms-2 ${selectedLocation === "Mumbai"
                                                    ? "btn-info"
                                                    : "btn-outline-dark"
                                                    }`}
                                                onClick={() => handleLocationClick("Mumbai")}
                                                data-bs-dismiss="modal"
                                            >  <img src={mumbai} alt="" ></img>

                                                Mumbai
                                            </button>
                                            <button

                                                style={{ borderRadius: 0 }}
                                                className={`btn ms-2 ${selectedLocation === "Hyderabad"
                                                    ? "btn-info"
                                                    : "btn-outline-dark"
                                                    }`}
                                                onClick={() => handleLocationClick("Hyderabad")}
                                                data-bs-dismiss="modal"
                                            >
                                                <img src={Hydrabad} alt=''  ></img> Hyderabad
                                            </button>
                                            <button

                                                style={{ borderRadius: 0 }}
                                                className={`btn ms-2 ${selectedLocation === "Cochin"
                                                    ? "btn-info"
                                                    : "btn-outline-dark"
                                                    }`}
                                                data-bs-dismiss="modal"
                                                onClick={() => handleLocationClick("Cochin",)}
                                            >
                                                <img src={Cochin} alt=""></img>Cochin
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 ms-5 mt-2">
                        <div className="row d-flex ">
                            <div className="col-10">
                                <input
                                    className="form-control text-dark ms-3"
                                    type="text"
                                    name="search"
                                    placeholder="Enter Movie Name here"
                                />

                            </div>
                            <div className="col-2 ">
                                <button type="button" className="btn btn-danger" style={{ borderRadius: 25 }}><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                    </div>

                </div>

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


export const Tamildisplay = () => {
    const [Tamil, settamil] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        closeModal();
    };

    useEffect(() => {
        fetch(`http://localhost:4000/TamilMovies/${id}`)
            .then((response) => response.json())
            .then((data) => settamil(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {

        getrating();

    }, [])

    const getrating = async () => {
        setInterval(2000);
        await axios
            .get(`http://localhost:4000/ratingreviews?movieId=${id}`)

            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });

    }

    const handleRateSubmit = async () => {
        const review = document.querySelector('.input-form').value;

        const data = {
            movieId: id,
            rating: rating,
            review: review
        };

        await axios.post("http://localhost:4000/ratingreviews", data)

            .then((response) => {
                toast.success("Review submitted:", response.data);
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
            });

        document.querySelector(".input-form").value = "";
        setRating(0);
    };

    useEffect(() => {
        if (selectedDate) {

            window.location.href = `/Choosenmovie/${Tamil.id}?date=${selectedDate.toISOString()}`;
        }
    }, [selectedDate]);

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

    const divStyle = {
        width: "100%",
        height: "600px", // Set the desired height
        backgroundSize: "cover",
        padding: "50px",
        backgroundPosition: "fixed",
        backgroundImage: `url(${Tamil.cover})`,
    };
    return (
        <div>
            <div className=" pt-2" id='bg' style={divStyle}>
                <div className="container" id='con' >

                    <div className="row mt-3 " id='vc'>

                        <div key={Tamil.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Tamil.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-6 mb-2">
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
                                    <div className="col-5">
                                        <h2 style={{ fontSize: 15 }}>{Tamil.Quality}</h2>

                                    </div>
                                    <div className="col-7">
                                        <h5>Language : {Tamil.language}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.duration}</h2>

                                    </div>
                                    <div className="col-5">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Tamil.Certificate}</h2>
                                    </div>
                                    <div className="col-6 mt-4">
                                        <button className="btn btn" style={{ backgroundColor: "red", color: "white" }} onClick={openModal}>
                                            BOOK NOW
                                        </button>
                                    </div>
                                    <div className="col-5">
                                        <Link to={`/TamilTrailer/${Tamil.id}`}  ><button className="btn btn mt-4" style={{ backgroundColor: "red", color: "white" }}>watch trailer</button></Link>

                                    </div>
                                    {isModalOpen && (
                                        <div className="modal fade show" id="bookingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                                            <div className="modal-dialog  modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Select a Date</h5>
                                                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center">
                                                        {[0, 1, 2, 3, 4].map((day) => (
                                                            <div key={day}>
                                                                <button className="btn btn-light m-1" onClick={() => handleDateSelect(new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000))}>
                                                                    {new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}



                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 16 }}>{Tamil.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src={Tamil.maleavatar} alt="" />
                            <strong><span>{Tamil.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src={Tamil.femaleleadavatar} alt="" />
                            <strong><span>{Tamil.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src={Tamil.Directoravatar} alt="" />
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

export const Malayalamdisplay = () => {

    const [Malayalam, setMalayalam] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleRatingClick = (value) => {
        setRating(value);
    };
    useEffect(() => {
        fetch(`http://localhost:4000/MalayalamMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setMalayalam(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {
        getrating();
    }, [])
    const getrating = async () => {
        await axios
            .get(`http://localhost:4000/ratingreviews?movieId=${id}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }
    const divStyle = {
        width: "100%",
        height: "600px", // Set the desired height
        backgroundSize: "cover",
        padding: "50px",
        backgroundPosition: "fixed",
        backgroundImage: `url(${Malayalam.cover})`,
    };

    const handleRateSubmit = async () => {
        const review = document.querySelector('.input-form').value;

        const data = {
            movieId: id,
            rating: rating,
            review: review
        };

        await axios.post("http://localhost:4000/ratingreviews", data)
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        closeModal();
    };
    useEffect(() => {
        if (selectedDate) {
            window.location.href = `/ChoosenMalayalammovie/${Malayalam.id}?date=${selectedDate.toISOString()}`;
        }
    }, [selectedDate]);

    return (
        <div>
            <div className=" pt-2" id='bg' style={divStyle}>
                <div className="container" id='con' >

                    <div className="row mt-3 " id='vc'>

                        <div key={Malayalam.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Malayalam.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-5 mb-2">
                            <strong><h2 className="mt-5">{Malayalam.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt=""></img></strong>
                                </div>
                                <div className="col">
                                    <h2 style={{ fontSize: 25 }}>{Malayalam.Rating}</h2>

                                </div>

                                <h2 style={{ fontSize: 21 }}>Add your rating & review    <button className="btn btn-light mt-2" data-bs-toggle="modal" data-bs-target="#rating">Rate Now</button></h2>
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
                                    <div className="col-4">
                                        <h2 style={{ fontSize: 15 }}>{Malayalam.Quality}</h2>

                                    </div>
                                    <div className="col-4">
                                        <h5>Language : {Malayalam.language}</h5>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.duration}</h2>

                                    </div>
                                    <div className="col-5">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Malayalam.Certificate}</h2>
                                    </div>
                                    <div className="col-4 mt-4">
                                        <button className="btn btn" style={{ backgroundColor: "red", color: "white" }} onClick={openModal}>
                                            BOOK NOW
                                        </button>
                                    </div>
                                    <div className="col-5">
                                        <Link to={`/MalayalamTrailer/${Malayalam.id}`}  ><button className="btn btn mt-4" style={{ backgroundColor: "red", color: "white" }}>watch trailer</button></Link>
                                    </div>
                                    {isModalOpen && (
                                        <div className="modal fade show" id="bookingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Select a Date</h5>
                                                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center">
                                                        {[0, 1, 2, 3, 4].map((day) => (
                                                            <div key={day}>
                                                                <button className="btn btn-light m-1" onClick={() => handleDateSelect(new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000))}>
                                                                    {new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}




                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 16 }}>{Malayalam.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src={Malayalam.maleavatar} alt="" />
                            <strong><span>{Malayalam.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src={Malayalam.femaleleadavatar} alt="" />
                            <strong><span>{Malayalam.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src={Malayalam.Directoravatar} alt="" />
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
export const Telugudisplay = () => {

    const [Telugu, setTelugu] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleRatingClick = (value) => {
        setRating(value);
    };
    useEffect(() => {
        fetch(`http://localhost:4000/TeluguMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setTelugu(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        closeModal();
    };

    useEffect(() => {
        getrating();
    }, [])
    const getrating = async () => {
        await axios.get(`http://localhost:4000/ratingreviews?movieId=${id}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });

    }
    const divStyle = {
        width: "100%",
        height: "600px", // Set the desired height
        backgroundSize: "cover",
        padding: "50px",
        backgroundPosition: "fixed",
        backgroundImage: `url(${Telugu.cover})`,
    };
    const handleRateSubmit = async () => {
        const review = document.querySelector('.input-form').value;

        const data = {
            movieId: id,
            rating: rating,
            review: review
        };

        await axios.post("http://localhost:4000/ratingreviews", data)
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

    useEffect(() => {
        if (selectedDate) {

            window.location.href = `/ChoosenTelugumovie/${Telugu.id}?date=${selectedDate.toISOString()}`;
        }
    }, [selectedDate]);

    return (
        <div>
            <div className=" pt-2" id='bg' style={divStyle} >
                <div className="container" id='con' >

                    <div className="row mt-3 " id='vc'>

                        <div key={Telugu.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={Telugu.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-8 mb-2">
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
                                    <div className="col-2">
                                        <h2 style={{ fontSize: 15 }}>{Telugu.Quality}</h2>

                                    </div>
                                    <div className="col-7">
                                        <h5>Language : {Telugu.language}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.duration}</h2>

                                    </div>
                                    <div className="col-4">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{Telugu.Certificate}</h2>
                                    </div>
                                    <div className="col-5 mt-4">
                                        <button className="btn btn" style={{ backgroundColor: "red", color: "white" }} onClick={openModal}>
                                            BOOK NOW
                                        </button>
                                    </div>
                                    {isModalOpen && (
                                        <div className="modal fade show" id="bookingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Select a Date</h5>
                                                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center">
                                                        {[0, 1, 2, 3, 4].map((day) => (
                                                            <div key={day}>
                                                                <button className="btn btn-light m-1" onClick={() => handleDateSelect(new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000))}>
                                                                    {new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-3">
                                        <Link to={`/TeluguTrailer/${Telugu.id}`}  ><button className="btn btn mt-4" style={{ backgroundColor: "red", color: "white" }}>watch trailer</button></Link>
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
                    <h3 style={{ fontSize: 16 }}>{Telugu.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src={Telugu.maleavatar} alt="" />
                            <strong><span>{Telugu.MaleLead}</span></strong>
                            <span>Lead Actor</span>

                        </div>
                        <div className="avatar">
                            <img src={Telugu.femaleleadavatar} alt="" />
                            <strong><span>{Telugu.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src={Telugu.Directoravatar} alt="" />
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

export const Hindidisplay = () => {
    const { id } = useParams();
    const [display, setDisplay] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [theatreList, setTheatreList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    useEffect(() => {
        fetch(`http://localhost:4000/HindiMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setDisplay(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    useEffect(() => {
        getRating();
        fetchTheatreList();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        closeModal();
    };

    useEffect(() => {
        if (selectedDate) {

            window.location.href = `/Choosenmovie/${display.id}?date=${selectedDate.toISOString()}`;
        }
    }, [selectedDate]);

    const getRating = async () => {
        await axios
            .get(`http://localhost:4000/ratingreviews?movieId=${id}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    };

    const fetchTheatreList = async () => {
        try {
            const response = await axios.get("http://localhost:4000/ThetreList");
            setTheatreList(response.data);
        } catch (error) {
            console.error("Error fetching theatre list:", error);
        }
    };

    const handleRateSubmit = async () => {
        const review = document.querySelector('.input-form').value;

        const data = {
            movieId: id,
            rating: rating,
            review: review
        };

        await axios.post("http://localhost:4000/ratingreviews", data)
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
    const handleBookNowClick = () => {
        const movieName = display.Name;
        console.log("Selected movie name:", movieName); // Add this line
        const theatersForMovie = theatreList.filter(theatre => theatre.MoviesRunning1 === movieName);

        if (theatersForMovie.length > 0) {
            setSelectedMovie(theatersForMovie);
        } else {
            setSelectedMovie(null);
            console.error("No theaters found for the selected movie.");
        }
    };

    const divStyle = {
        width: "100%",
        height: "600px",
        backgroundSize: "100%",
        padding: "50px",
        backgroundPosition: "fixed",
        backgroundImage: `url(${display.cover})`,
    };
    return (
        <div>
            <div className="pt-2" id='bg' style={divStyle}>

                <div className="container-fluid " id='con'>
                    <div className="row mt-3" id='vc'>
                        <div key={display.id} className="col-sm-6 col-md-4 col-lg-3 mb-2  p-2">
                            <Card className="movie-card mb-2 mt-2">
                                <CardImg src={display.image} id="movie-card" />
                            </Card>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-5 mb-2">
                            <strong><h2 className="mt-5">{display.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt="" /></strong>
                                </div>
                                <div className="col">
                                    <h2 style={{ fontSize: 25 }}>{display.Rating}</h2>
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
                            </div>
                            <div className="row">
                                <div className="col-9">
                                    <h2 style={{ fontSize: 15 }}>{display.Quality}</h2>
                                </div>
                                <div className="col-5">
                                    <h5>Language : {display.language}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h2 className="mt-3" style={{ fontSize: 20 }}>{display.duration}</h2>
                                </div>
                                <div className="col-8">
                                    <h2 className="mt-3" style={{ fontSize: 20 }}>{display.genre}</h2>
                                </div>
                                <div className="col-2">
                                    <h2 className="mt-3" style={{ fontSize: 20 }}>{display.Certificate}</h2>
                                </div>
                                <div className="col-6 mt-2">
                                    <button className="btn btn" style={{ backgroundColor: "red", color: "white" }} onClick={openModal}>
                                        BOOK NOW
                                    </button>
                                </div>
                                {isModalOpen && (
                                    <div className="modal fade show" id="bookingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Select a Date</h5>
                                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body d-flex justify-content-center">
                                                    {[0, 1, 2, 3, 4].map((day) => (
                                                        <div key={day}>
                                                            <button className="btn btn-light m-1" onClick={() => handleDateSelect(new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000))}>
                                                                {new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-6  ">
                                    <Link to={`/Trailer/${display.id}`}  ><button className="btn btn mt-4" style={{ backgroundColor: "red", color: "white" }}>watch trailer</button></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {selectedMovie && (
                    <div id='body' className="container mt-5">
                        <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>Theatres Running {selectedMovie[0].MoviesRunning1}</h2>
                        <div className="row">
                            {selectedMovie.map((theatre) => (
                                <div className="col" key={theatre.Name}>
                                    <Card className="mb-3" style={{ padding: 25, maxWidth: "400px" }}>
                                        <div>
                                            <h5>Theatre Name: {theatre.Name}</h5>
                                            <h5>Location: {theatre.location}</h5>
                                            <Link to='/show'>   <button className="btn btn" style={{ backgroundColor: "red", color: "white" }}>BOOK NOW</button> </Link>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div id='body' className="container mt-5">
                    <h2 className="mt-2" style={{ fontWeight: "bolder", fontSize: 26 }}>About the movie</h2>
                    <h3 style={{ fontSize: 16 }}>{display.About}</h3>
                    <hr />
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src={display.maleavatar} alt="" />
                            <strong><span>{display.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src={display.femaleleadavatar} alt="" />
                            <strong><span>{display.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src={display.Directoravatar} alt="" />
                            <strong><span>{display.Director}</span></strong>
                            <span>Director</span>
                        </div>

                    </div>
                    <hr />
                    <div className="mt-4">
                        <h2 style={{ fontSize: 26, fontWeight: "bolder" }}>TOP REVIEWS</h2>
                        <div className="row">
                            {reviews.map((review) => (
                                <div className="col" key={review.id}>
                                    <Card className="mb-3" style={{ padding: 25, maxWidth: "400px" }}>
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
