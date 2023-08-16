import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardImg } from "react-bootstrap";
import '../styles/Homepage.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Moviedisplay = () => {
    const { id } = useParams();
    const [display, setDisplay] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    useEffect(() => {
        fetch(`http://localhost:4000/HindiMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setDisplay(data))
            .catch((error) => console.error("Error fetching data:", error));


    }, [id]);

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
            <div className=" pt-2" id='bg' style={{ paddingBottom: 50 }}>
                <div className="container" id='con' >

                    <div className="row mt-3 " >

                        <div key={display.id} className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <Card className="movie-card mb-2" >
                                <CardImg src={display.image} id="movie-card"></CardImg>
                            </Card>

                        </div>

                        <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                            <strong><h2 className="mt-5">{display.Name}</h2></strong>
                            <div className="row">
                                <div className="col-1">
                                    <strong><img src='https://img.icons8.com/?size=512&id=qdQpy48X3Rjv&format=png' width={25} height={25} alt=""></img></strong>
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

                                <div className="row">
                                    <div className="col-9">
                                        <h2 style={{ fontSize: 15 }}>{display.Quality}</h2>

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
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{display.duration}</h2>

                                    </div>
                                    <div className="col-8">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{display.genre}</h2>
                                    </div>
                                    <div className="col-2">
                                        <h2 className="mt-3" style={{ fontSize: 20 }}>{display.Certificate}</h2>
                                    </div>
                                    <div className="col-6 mt-2 " >
                                        <Link to="/ThetreList">  <button className="btn btn" style={{ backgroundColor: "red", color: "white" }}>BOOK NOW</button></Link>
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
                    <h3 style={{ fontSize: 18 }}>{display.About}</h3>
                    <hr></hr>
                    <h2 style={{ fontWeight: "bolder", fontSize: 26 }}>CAST  & CREW</h2>
                    <div className="avatar-container">
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18517.jpg?w=740" alt="" />
                            <strong><span>{display.MaleLead}</span></strong>
                            <span>Lead Actor</span>
                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{display.FemaleLead}</span></strong>
                            <span>Lead Actress</span>

                        </div>
                        <div className="avatar">
                            <img src="https://img.freepik.com/premium-vector/businessman-bearded-work-leadership_18591-5278.jpg?size=626&ext=jpg&ga=GA1.2.912556834.1692088483&semt=ais" alt="" />
                            <strong><span>{display.Director}</span></strong>
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

export default Moviedisplay;