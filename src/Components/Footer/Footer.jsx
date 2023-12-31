import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const Footer = () => {
    const [Hindhi, SetHindhi] = useState([]);
    const [Tamil, SetTamil] = useState([]);
    const [Telegu, SetTelegu] = useState([]);
    const [Malayalam, SetMalayalam] = useState([]);
    //Hindi movies
    useEffect(() => {
        fetch('http://localhost:4000/HindiMovies')
            .then((response) => response.json())
            .then((data) => SetHindhi(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
    //Tamil movies
    useEffect(() => {
        fetch('http://localhost:4000/TamilMovies')
            .then((response) => response.json())
            .then((data) => SetTamil(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
    //Telegu Movies
    useEffect(() => {
        fetch('http://localhost:4000/TeluguMovies')
            .then((response) => response.json())
            .then((data) => SetTelegu(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
    //Malayalam Movies
    useEffect(() => {
        fetch('http://localhost:4000/MalayalamMovies')
            .then((response) => response.json())
            .then((data) => SetMalayalam(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
    return (
        <>
            <div className=" text-white bottom-fixed" style={{ fontSize: '13px', backgroundColor: "#080527fd" , fontFamily:"Work Sans, sans-serif"}}>
                <section class="sect1 pb-3">
                    {/* <!--large screen view part1--> */}
                    <div class="container-fluid d-none d-md-block">
                        <div class="row pt-3">
                            <div class="col-lg-1"></div>
                            <div className="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>UPCOMING HINDHI MOVIES</h6>
                                <ul className="text-start">
                                    {Hindhi.map((movie) => (
                                        <li key={movie.id}>{movie.Name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>UPCOMING TAMIL MOVIES</h6>
                                <ul className="text-start">
                                    {Tamil.map((movie) => (
                                        <li key={movie.id}>{movie.Name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>UPCOMING TELEGU MOVIES</h6>
                                <ul className="text-start">
                                    {Telegu.map((movie) => (
                                        <li key={movie.id}>{movie.Name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>UPCOMING MALAYALAM MOVIES</h6>
                                <ul className="text-start">
                                    {Malayalam.map((movie) => (
                                        <li key={movie.id}>{movie.Name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div class="col-md-4 col-lg-2 text-start">
                                <h6 className="ms-3" style={{ fontSize: '14px' }}>Follows us</h6>
                                <div class="d-flex social">
                                    <Link to="https://www.instagram.com/bookmyshowin/" className="ms-2"><i class="fa-brands fa-instagram" style={{ color: 'black', backgroundColor: 'white', width: '40px', height: '40px', borderRadius: '30px', paddingTop: '10px', paddingLeft: '13px' }}></i> </Link>
                                    <Link to="https://twitter.com/bookmyshow?lang=en" className="ms-2"><i class="fa-brands fa-twitter" style={{ color: 'black', backgroundColor: 'white', width: '40px', height: '40px', borderRadius: '30px', paddingTop: '10px', paddingLeft: '13px' }}></i> </Link>
                                    <Link to="https://www.facebook.com/BookMyShowIN/" className="ms-2"><i class="fa-brands fa-facebook" style={{ color: 'black', backgroundColor: 'white', width: '40px', height: '40px', borderRadius: '30px', paddingTop: '10px', paddingLeft: '13px' }}></i> </Link>
                                    <Link to="https://in.linkedin.com/company/bookmyshow" className="ms-2"><i class="fa-brands fa-linkedin" style={{ color: 'black', backgroundColor: 'white', width: '40px', height: '40px', borderRadius: '30px', paddingTop: '10px', paddingLeft: '13px' }}></i> </Link>
                                </div>
                            </div>
                            <div class="col-lg-1"></div>
                        </div>
                    </div>
                    {/* <!--small screen view part1--> */}
                    <div class="container-fluid d-sm-block d-md-none text-center " id="menu1" >
                        <div class="accordion accordion-flush mb-3" id="accordionFlushExample">
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        UPCOMMING HINDI MOVIES
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="col-md-2 col-lg-2 text-start">
                                        <ul className="text-start">
                                            {Hindhi.map((movie) => (
                                                <li key={movie.id}>{movie.Name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        UPCOMMING TAMIL MOVIES
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="col-md-2 col-lg-2 text-start">
                                        <ul className="text-start">
                                            {Tamil.map((movie) => (
                                                <li key={movie.id}>{movie.Name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingThree">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        UPCOMMING TELEGU MOVIES
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="col-md-2 col-lg-2 text-start">
                                        <ul className="text-start">
                                            {Telegu.map((movie) => (
                                                <li key={movie.id}>{movie.Name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingFour">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                    UPCOMMING MALAYALAM MOVIES
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingFour"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="col-md-2 col-lg-2 text-start">
                                        <ul className="text-start">
                                            {Malayalam.map((movie) => (
                                                <li key={movie.id}>{movie.Name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex">
                                <h6 class=" mt-1 ms-3" style={{ fontSize: '13px' }}>Follows us</h6>
                                <Link to="https://www.instagram.com/bookmyshowin/" className="ms-2"><i class="fa-brands fa-instagram" style={{ color: 'black', backgroundColor: 'white', width: '30px', height: '30px', borderRadius: '30px', paddingTop: '10px' }}></i> </Link>
                                <Link to="https://twitter.com/bookmyshow?lang=en" className="ms-2"><i class="fa-brands fa-twitter" style={{ color: 'black', backgroundColor: 'white', width: '30px', height: '30px', borderRadius: '30px', paddingTop: '10px' }}></i> </Link>
                                <Link to="https://www.facebook.com/BookMyShowIN/" className="ms-2"><i class="fa-brands fa-facebook" style={{ color: 'black', backgroundColor: 'white', width: '30px', height: '30px', borderRadius: '30px', paddingTop: '10px' }}></i> </Link>
                                <Link to="https://in.linkedin.com/company/bookmyshow" className="ms-2"><i class="fa-brands fa-linkedin" style={{ color: 'black', backgroundColor: 'white', width: '30px', height: '30px', borderRadius: '30px', paddingTop: '10px' }}></i> </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!--part2--> */}
                <section class="sect2">
                    <div class="container-fluid">
                        <div class="row d-flex pt-3 pb-3">
                            <div class="col-lg-1"></div>
                            <div class="col-sm-12 col-md-6 col-lg-7 text-end " style={{ fontSize: '10px' }}>
                                <span>Copyright 2023 @ Bigtree Entertainement Pvt.Ltd All Rights Reserved</span>
                            </div>
                            <div class="col-lg-1"></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Footer;