import React from "react";
import '../Payment/Next.css';
import { useNavigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';

const Next = () => {
    const Navigate = useNavigate();
    const handleClick = () => {
        Navigate("/PaymentSummary");
    }
    return (
        <>

            <div class="container p-0 ps-5 me-5 offset-3">
                <div className="" style={{}}>
                    <p className="btn bg-black text-white mt-5" onClick={handleClick}>Back</p>
                </div>
                <div class="card paymentdetails px-4 ps-5 me-5">
                    <p class="h8 py-3">Payment Details</p>
                    <div class="row gx-3">
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Person Name</p>
                                <input class="form-control cc mb-3" type="text" placeholder="Barry Allen" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Card Number</p>
                                <input class="form-control cc mb-3" type="text" placeholder="1234 5678 435678" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Expiry</p>
                                <input class="form-control cc mb-3" type="text" placeholder="MM/YYYY" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">CVV/CVC</p>
                                <input class="form-control cc mb-3 pt-2 " type="password" placeholder="***" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="btn btn-primary mb-3">
                                <div class="col-md-7 col-sm-12 p-0 box">
                                    {/* Gpay option */}
                                    <GooglePayButton className='ms-5 ps-4'
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
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Next;