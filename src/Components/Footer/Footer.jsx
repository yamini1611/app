import React from "react";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (

        <>
            <div className=" text-white" style={{ fontSize: '13px', backgroundColor: '#090633fd' }}>
                <section class="sect1 pb-3">
                    {/* <!--large screen view part1--> */}
                    <div class="container-fluid d-none d-md-block">
                        <div class="row pt-3">
                            <div class="col-lg-1"></div>
                            <div class="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>UPCOMMING MOVIES IN AHMEDABAD</h6>
                                <ul class="text-start">
                                    <li>Jailer(Malayalam)</li>
                                    <li>Peddha Kapu:Part 1</li>
                                    <li>Ghoomer</li>
                                    <li>Juniour(2023)</li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>MOVIES BY GENDER</h6>
                                <ul class="text-start">
                                    <li>Drama Movies</li>
                                    <li>Action Movies</li>
                                    <li>Comedy Movies</li>
                                    <li>Sci-Fi Movies</li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-lg-2 text-start">
                                <h6 style={{ fontSize: '13px' }}>HELP</h6>
                                <ul class="text-start">
                                    <li>About us</li>
                                    <li>Current Openings</li>
                                    <li>Contact Us</li>
                                    <li>Press Release</li>
                                    <li>FAQs</li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-lg-2 text-start">
                                <h6 class style={{ fontSize: '13px' }}>MOVIES IN TOP CITIES</h6>
                                <ul class="text-start">
                                    <li>Movies in Mumbai</li>
                                    <li>Movies in Bengaluru</li>
                                    <li>Movies in Hyderabad</li>
                                    <li>Movies in Pune</li>
                                    <li>Movies in Ahmedabad</li>
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
                                        Popular Movies
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <ul class="text-start">
                                            <li>Jailer(Malayalam)</li>
                                            <li>Peddha Kapu:Part 1</li>
                                            <li>Ghoomer</li>
                                            <li>Juniour(2023)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        MOVIES IN TOP CITIES
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <ul class="text-start">
                                            <li>Movies in Mumbai</li>
                                            <li>Movies in Bengaluru</li>
                                            <li>Movies in Hyderabad</li>
                                            <li>Movies in Pune</li>
                                            <li>Movies in Ahmedabad</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingThree">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        HELP
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingThree"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <ul class="text-start">
                                            <li>About us</li>
                                            <li>Current Openings</li>
                                            <li>Contact Us</li>
                                            <li>Press Release</li>
                                            <li>FAQs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="flush-headingFour">
                                    <button style={{ fontSize: '13px' }} class="accordion-button collapsed bg-transparent text-white" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        COUNTRIES
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" class="accordion-collapse collapse text-white" aria-labelledby="flush-headingFour"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <ul>
                                            <li>Indonesia</li>
                                            <li>Singapore</li>
                                            <li>UAE</li>
                                            <li>West Indies</li>
                                            <li>Srilanka</li>
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