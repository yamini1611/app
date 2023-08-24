import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyTheatre = () => {
  const { theaterId } = useParams();
  const [theatreDetails, setTheatreDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const apiUrl = `http://localhost:4000/Theateraccepted/`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.length > 0) {
          setTheatreDetails(response.data[0][0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching theater details:', error);
      });
  }, [theaterId]);

  const handleProceed = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const theaterData = {};
    formData.forEach((value, key) => {
      theaterData[key] = value;
    });

    axios
      .post('http://localhost:4000/ThetreList', theaterData)
      .then((response) => {
        console.log('Theater data submitted:', response.data);
        alert ('success')
      })
      .catch((error) => {
        console.error('Error submitting theater data:', error);
        
      });
  };

  if (!theatreDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <h2>{theatreDetails.theaterName}</h2>
          <Card.Subtitle className="mb-2 text-muted">
            Location: {theatreDetails.location}
          </Card.Subtitle>
          {theatreDetails.status ? (
            <div className="alert alert-success" role="alert">
              Your theater is Verified  & Approved by TentKotta!
            </div>
          ) : null}

          {!showForm ? (
            <Button variant="primary" onClick={handleProceed}>
              Proceed
            </Button>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Theatre Name</Form.Label>
                <Form.Control type="text" name="Name" className='text-black' value={theatreDetails.theaterName} readOnly />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" className='text-black' value={theatreDetails.location} readOnly />
              </Form.Group>
              <Form.Group controlId="formMoviesRunning1">
                <Form.Label>Movies Running</Form.Label>
                <Form.Control type="text" name="MoviesRunning1" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formShow1">
                <Form.Label>Show 1</Form.Label>
                <Form.Control type="text" name="show1" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formShow2">
                <Form.Label>Show 2</Form.Label>
                <Form.Control type="text" name="show2" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formShow3">
                <Form.Label>Show 3</Form.Label>
                <Form.Control type="text" name="show3" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formShow4">
                <Form.Label>Show 4</Form.Label>
                <Form.Control type="text" name="show4" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formShow4">
                <Form.Label>Show 5</Form.Label>
                <Form.Control type="text" name="show5" className='text-black' required />
              </Form.Group>
              <Form.Group controlId="formCover">
                <Form.Label>Cover URL</Form.Label>
                <Form.Control type="text" name="cover" className='text-black' required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTheatre;
