import React from "react";
import '../Payment/Payment.css';
import { Link } from 'react-router-dom';

const PaymentSummary = () => {
    const currentTime = new Date().toLocaleString();
    return (
        <>
            <div class="container-fluid mb-5">
                <section class="vh-100" style={{ backgroundColor: '#eee' }}>
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100 text-center">
                            <div class="col">
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" class="btn btn-primary btn-lg " data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1">
                                    Payment Summary
                                </button>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content text-white" style={{ backgroundColor: '#090633fd', borderRadius: '10px' }}>
                                            <div class="modal-header border-bottom-0">
                                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body text-start px-4 pt-0 pb-4">
                                                <div class="text-center">
                                                    <h5 class="mb-3">Booking Status</h5>
                                                    <h5 class="mb-5">No of Seats Locked</h5>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <div class="col-md-4 text-center">
                                                        <p class="lead fw-normal">{currentTime}</p>
                                                    </div>
                                                </div>
                                                <p className=" mb-2 ms-2">Elite Category</p>
                                                <div class="d-flex justify-content mb-2 ms-2">
                                                    <br />
                                                    <div class="text-center">
                                                        <p>Elite : null</p>
                                                    </div>
                                                </div>
                                                <p className=" mb-2 ms-2">Budget Category</p>

                                                <div class="d-flex justify-content mb-2 ms-2">
                                                    <p>Budget : null</p>
                                                </div>

                                                <div className="offset-10">
                                                    <div class="col-md-2">
                                                        <p className=""> <i class="fas fa-phone fa-lg "></i>6382830212</p>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <p><i class="fas fa-envelope fa-lg"></i>Queries?</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <p><Link to='/Next'><i class="fa-solid fa-arrow-right"></i></Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default PaymentSummary 