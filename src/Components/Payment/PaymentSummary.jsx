import React from "react";
import '../Payment/Payment.css';
import { Link } from 'react-router-dom';

const PaymentSummary = () => {
    const currentTime = new Date().toLocaleString();
    return (
        <>
            <div class="container-fluid ">
                <div class="row justify-content-center ">
                    <div class="col-12 col-lg-11">
                        <div class="card card0 rounded-0">
                            <div class="row cardcontainer">
                                <div class="col-md-5 d-md-block d-none p-0 box">
                                    <div class="card rounded-0 border-0 card1" id="bill">
                                        <h3 id="heading1">Payment Summary</h3>
                                        <br />
                                        <div className="current-time text-white">
                                            <p className="bill-date">Current Time: {currentTime}</p>
                                        </div>
                                        <br />
                                        <h3 id="heading1">Seat Booking Summary</h3>
                                        <br />
                                        <div class="seat-categories text-white">
                                            <div class="seat-category ">
                                                <h6>Silver Seats</h6>
                                                <p id="heading2">Seats Booked: </p>
                                            </div>
                                            <br />
                                            <div class="seat-category">
                                                <h6>Gold Seats</h6>
                                                <p id="heading2">Seats Booked: </p>
                                            </div>
                                            <br />
                                            <div class="seat-category">
                                                <h6>Platinum Seats</h6>
                                                <p id="heading2">Seats Booked: </p>
                                            </div>
                                            <div class="" style={{ float: 'right' }}>
                                                <Link className="btn" style={{ borderColor: 'black', color: 'black', fontWeight: 'bold' }} to='/Next'>Next</Link>
                                            </div>
                                            <div className="col">
                                                <p>Movie</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSummary 