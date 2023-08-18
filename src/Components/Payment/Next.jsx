import React, { useState, useEffect } from 'react';
import '../Payment/Next.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';
import { ToastContainer, toast } from 'react-toastify';

const Next = () => {
    const Navigate = useNavigate();
    const [Payment, SetPayment] = useState("");
    const [name, SetName] = useState('');
    const [cardnumber, SetCardnumber] = useState('');
    const [expiry, SetExpiry] = useState('');
    const [cvv, SetCvv] = useState('');
    const [errors, setErrors] = useState({});

    const handleClick = () => {
        Navigate("/");
    }

    useEffect(() => {
        fetch("http://localhost:4000/Payment")
            .then((response) => response.json())
            .then((data) => SetPayment(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z]{1,30}$/;
        return nameRegex.test(name);
    };

    const isValidCardNumber = (cardnumber) => {
        const codeRegex = /^\d{16}$/;
        return codeRegex.test(cardnumber);
    };

    const isValidcvv = (cvv) => {
        const codeRegex = /^\d{3}$/;
        return codeRegex.test(cvv);
    };
    const handleregister = () => {

        setErrors({});
        const validationErrors = {};

        if (name.trim() === "") {
            validationErrors.name = "Required";
        } else if (!isValidName(name)) {
            validationErrors.name = "Set a valid name";
        }

        if (cardnumber.trim() === "") {
            validationErrors.cardnumber = "Required";
        } else if (!isValidCardNumber(cardnumber)) {
            validationErrors.cardnumber = "Set a valid card number";
        }


        if (cvv.trim() === "") {
            validationErrors.cvv = "Required";
        } else if (!isValidcvv(cvv)) {
            validationErrors.cvv = "Set a valid cvv number";
        }

        if (Object.keys(validationErrors).length === 0) {

            const PaymentDtata = {
                name,
                cardnumber,
                expiry,
                cvv
            };

            fetch("http://localhost:4000/Payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(PaymentDtata),
            })
                .then((response) => {
                    if (response.ok) {
                        SetName("");
                        SetCardnumber("");
                        SetExpiry("");
                        SetCvv("");
                    }
                })
                .catch((error) => {
                    console.error("Error during registration:", error);
                });
        }
        else {
            setErrors(validationErrors);
        }

    }
    return (
        <>

            <div class="container p-0 mb-5">
                <div className="" style={{}}>
                    <p className="btn bg-black text-white mt-5" onClick={handleClick}>Back</p>
                </div>
                <div class="card paymentdetails px-4 ps-5 me-5">
                    <p class="h8 py-3">Payment Details</p>
                    <p className="fs-6 d-flex flex-row" style={{ fontWeight: 'bold' }}><Summary /></p>
                    <div class="row gx-3">
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Person Name</p>
                                <input class="form-control cc mb-3 text-black" type="text" placeholder="Barry Allen" value={name} onChange={(e) => SetName(e.target.value)} />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Card Number</p>
                                <input class="form-control cc mb-3 text-black" type="text" placeholder="1234 5678 4356 9078" value={cardnumber} onChange={(e) => SetCardnumber(e.target.value)} />
                                {errors.cardnumber && <span className="error">{errors.cardnumber}</span>}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Expiry</p>
                                <input class="form-control cc mb-3  text-black" type="text" placeholder="MM/YYYY" value={expiry} onChange={(e) => SetExpiry(e.target.value)} />
                                {errors.expiry && <span className="error">{errors.expiry}</span>}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">CVV/CVC</p>
                                <input class="form-control cc mb-3 pt-2 text-black" type="password" placeholder="***" value={cvv} onChange={(e) => SetCvv(e.target.value)} />
                                {errors.cvv && <span className="error">{errors.cvv}</span>}
                            </div>
                        </div>
                        <button onClick={handleregister} className='btn btn-primary'>Pay Now</button>

                        <div className="mt-3 d-flex justify-content-center">
                            {/* Gpay option */}
                            <GooglePayButton className='gpay'
                                environment="TEST"
                                paymentRequest={{
                                    apiVersion: 2,
                                    apiVersionMinor: 0,
                                    allowedPaymentMethods: [
                                        {
                                            type: 'CARD',
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',//name
                                                    gatewayMerchantId: 'exampleGatewayMerchantId',//pass id 
                                                },
                                            },
                                        },
                                    ],
                                    merchantInfo: {
                                        merchantId: '12345678901234567890',
                                        merchantName: 'Demo Merchant',
                                    },
                                    transactionInfo: {
                                        totalPriceStatus: 'FINAL',
                                        totalPriceLabel: 'Total',
                                        totalPrice: '1',
                                        currencyCode: 'INR',
                                        countryCode: 'IN',

                                    },
                                }}
                                onLoadPaymentData={paymentRequest => {
                                    console.log('Success', paymentRequest);
                                }}
                                onPaymentAuthoriz={paymentData => {
                                    console.log('Payment Authorizedzed Success', paymentData)
                                    return { transactionState: 'Success' }
                                }}
                                existingPaymentMethodRequired='false'
                                buttonColor="white"
                                buttonType="Pay"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const Summary = () => {
    const currentTime = new Date().toLocaleString();
    return (
        <>
            <div class="container-fluid">
                <div class="container  h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100 text-center">
                        <div class="col">
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal1" style={{}}>
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
                                                <h5 class="mb-3 fs-3">BOOKING STATUS</h5>
                                                <h5 class="mb-5">Seats Locked</h5>
                                            </div>
                                            <div class="row justify-content-center">
                                                <div class="col-md-4 text-center">
                                                    <p class="lead fw-bold fs-6">{currentTime}</p>
                                                </div>
                                            </div>
                                            <p className=" ms-2 fs-5 d-flex justify-content-around">Elite Category</p>
                                            <div class="ms-2">
                                                <div class="text-center">
                                                    <p>Elite : 0</p>
                                                </div>
                                            </div>
                                            <p className=" mb-2 ms-2 fs-5 d-flex justify-content-around">Budget Category</p>

                                            <div class="d-flex justify-content-around ms-2">
                                                <p>Budget : 0</p>
                                            </div>
                                            <div class="d-flex justify-content-around ms-2 fs-4">
                                                <p>Total : ₹ 0</p>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <div class="col-md-2">
                                                    <p className="ms-2"> <i class="fas fa-phone fa-lg "></i>6382830212</p>
                                                </div>
                                                <div class="col-md-2">
                                                    <p className="ms-2"><i class="fas fa-envelope fa-lg"></i>Queries?</p>
                                                </div>
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


export default Next;