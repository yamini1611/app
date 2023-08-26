
import { CLIENT_ID } from '../Payment/Config'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import axios from "axios";



const Paypal = () => {
    const [show, setShow] = useState(true);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [register, setregister] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {

                    description: "Purchase",
                    amount: {
                        currency_code: "USD",
                        value: 20,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {

        if (success) {
            toast('Payment Successfull :)')
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div >
                {show ? (
                    <PayPalButtons
                        style={{}}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}
            </div>
        </PayPalScriptProvider>
    );
}

export default Paypal