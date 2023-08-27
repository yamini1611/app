import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Grid, Button } from "@mui/material";
import QRCode from 'qrcode';
import { QrReader } from 'react-qr-reader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Ticket = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [scannedQrCode, setScannedQrCode] = useState(null);
    const [scannedDetails, setScannedDetails] = useState(null);
    const [scannerDialogOpen, setScannerDialogOpen] = useState(false);

    const handleScannerButtonClick = () => {
        setScannerDialogOpen(true);
        setScannedQrCode(true);
        setScannedDetails(null);
    };

    const handleScannerDialogClose = () => {
        setScannerDialogOpen(false);
    };

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(JSON.stringify(paymentDetails));
            setImageUrl(response);
        } catch (error) {
            console.log("Not working");
        }
    }

    useEffect(() => {
        if (scannedQrCode) {
            // Assuming paymentDetails is the array of objects containing payment details
            const foundPerson = paymentDetails.find(person => person.name === scannedDetails);
            if (foundPerson) {
                setScannedDetails(foundPerson);
            } else {
                setScannedDetails('Person not found');
            }
        }
    }, [scannedQrCode]);

    return (
        <Container>
            <Qr />
            <Card>
                <h5 className='mt-5 text-center'>Download Your Tickets</h5>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Button variant="contained" className='mt-5' color="success" onClick={generateQrCode}>Generate</Button>
                            <br />
                            <Button variant="contained" className='mt-5' color="primary" onClick={handleScannerButtonClick}>Open Scanner</Button>
                            <Dialog open={scannerDialogOpen} onClose={handleScannerDialogClose}>
                                <DialogContent>
                                    {scannedDetails && (
                                        <p>
                                            Customer Name: {scannedDetails.name}
                                            <br />
                                            cardnumber: {scannedDetails.cardnumber}
                                            <br />
                                            Expiry Date: {scannedDetails.expiry}
                                            <br />
                                            Cvv: {scannedDetails.cvv}
                                        </p>
                                    )}
                                </DialogContent>
                            </Dialog>
                            <br />
                            <br />
                            <br />
                            {imageUrl && (
                                <a href={imageUrl} download>
                                    <img src={imageUrl} alt="img" />
                                </a>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Ticket;

// Assuming paymentDetails is an array of objects containing payment details
const paymentDetails = [
    {
        name: 'John Doe',
        cardnumber: '1234 5678 9012 3456',
        expiry: '12/24',
        cvv: '123'
    },
    // Add more objects here
];



const Qr = () => {
    const [scanResult, SetScanResult] = useState(null);
    const [check, setCheck] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/Payment/?name=${scanResult}`)
            .then(response => response.json())
            .then(data => {
                const ff = data.find(person => person.name === scanResult);
                if (ff) {
                    setCheck(ff);
                } else {
                    setCheck('Person not found');
                }
                console.log("camera" + ff)
            })
            .catch(error => {
                console.log(error);
                setCheck('An error occurred');
            });
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });
        scanner.render(success, error);
        function success(result) {
            scanner.clear();
            SetScanResult(result);
        }
        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <>
            <p>Qr code Scanning</p>
            {scanResult
                ? <div>Success:<a href={scanResult}>{scanResult}</a></div>
                : <div id="reader"></div>

            }

        </>
    );
}