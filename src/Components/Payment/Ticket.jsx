import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import QRCode from 'qrcode';
import { QrReader } from 'react-qr-reader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';
import { Html5QrcodeScanner } from 'html5-qrcode';
// import { Link } from 'react-router-dom';

const Ticket = () => {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scannedQrCode, setScannedQrCode] = useState(null);
    const [scannedDetails, setScannedDetails] = useState('');
    const [personName, setPersonName] = useState('');
    const [scannerDialogOpen, setScannerDialogOpen] = useState(false);

    const handleScannerButtonClick = () => {
        setScannerDialogOpen(true);
        setScannedQrCode(true);
        setScannedDetails('');
    };

    const handleScannerDialogClose = () => {
        setScannerDialogOpen(false);
    };

    const generateQrCode = async () => {
        try {
            if (personName == "") {
                toast('Plese Enter your name :)')
            }
            else if (personName) {
                setText(personName);
                const response = await QRCode.toDataURL(text);
                setImageUrl(response);
            } else {
                console.log("Person's name is empty");
            }
        } catch (error) {
            console.log("Not working");
        }
    }


    useEffect(() => {
        console.log((scannedQrCode))
        if (scannedQrCode) {
            fetch(`http://localhost:4000/Payment/?name=${personName}`)
                .then(response => response.json())
                .then(data => {
                    // Assuming your Payment JSON structure has an array of objects
                    const foundPerson = data.find(person => person.name === personName);
                    if (foundPerson) {
                        setScannedDetails(foundPerson);
                    } else {
                        setScannedDetails('Person not found');
                    }
                    console.log(foundPerson)
                })
                .catch(error => {
                    console.log(error);
                    setScannedDetails('An error occurred');
                });
        }
    }, [scannedQrCode]);

    const handleScan = qrCodeData => {
        if (qrCodeData) {
            setScannedQrCode(qrCodeData);
            console.log(qrCodeData)
        }
    };

    return (
        <Container>
            <Qr />
            <Card>
                <h5 className='mt-5 text-center'>Download Your Tickets</h5>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <TextField label="Enter Person's Name" onChange={(e) => setPersonName(e.target.value)} />
                            <br />
                            <Button variant="contained" className='mt-5' color="success" onClick={generateQrCode}>Generate</Button>
                            <br />
                            <Button variant="contained" className='mt-5' color="primary" onClick={handleScannerButtonClick}>Open Scanner</Button>
                            <Dialog open={scannerDialogOpen} onClose={handleScannerDialogClose}>
                                <DialogContent>
                                    {/* <QrReader
                                        onScan={handleScan}
                                        onError={error => console.log(error)}
                                    /> */}
                                    {scannedDetails && <p>
                                        Customer Name: {scannedDetails.Name}
                                        <br />
                                        cardnumber: {scannedDetails.cardnumber}
                                        <br />
                                        Expiry Date: {scannedDetails.expiry}
                                        <br />
                                        Cvv: {scannedDetails.cvv}

                                    </p>}
                                </DialogContent>
                            </Dialog>

                            <br />
                            <br />
                            <br />
                            {imageUrl ? (
                                <a href={imageUrl} download>
                                    <img src={imageUrl} alt="img" />
                                </a>
                            ) : null}
                            <QrReader
                                onScan={handleScan} // Use onScan instead of onResult
                                onError={error => console.log(error)}
                            />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Ticket;


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