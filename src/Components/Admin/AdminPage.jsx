import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [theaterData, setTheaterData] = useState([]);
  const [acceptedTheaters, setAcceptedTheaters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/TheaterOwner')
      .then(response => {
        setTheaterData(response.data);
      })
      .catch(error => {
        console.error('Error fetching theater data:', error);
      });
  }, []);

  const handleAccept = (theaterId) => {
    const theaterToAccept = theaterData.find(theater => theater.id === theaterId);

    const updatedTheater = { ...theaterToAccept, status: true };

    setAcceptedTheaters(prevAccepted => [...prevAccepted, updatedTheater]);

    setTheaterData(prevTheaters => prevTheaters.filter(theater => theater.id !== theaterId));
  };

  const handleDecline = (theaterId) => {
    axios.delete(`http://localhost:4000/TheaterOwner/${theaterId}`)
      .then(response => {
        console.log('Theater declined and deleted successfully:', response);

        setTheaterData(prevTheaters => prevTheaters.filter(theater => theater.id !== theaterId));
      })
      .catch(error => {
        console.error('Error declining theater:', error);
      });
  };

  const handlePostAcceptedTheaters = () => {
    const theatersWithUpdatedStatus = acceptedTheaters.map(theater => ({ ...theater, status: true }));
    axios.post('http://localhost:4000/Theateraccepted', theatersWithUpdatedStatus)
      .then(() => {
        setAcceptedTheaters([]); // Clear accepted theaters after successful post

        toast.success('Successfully added accepted theaters!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {
        toast.error('Failed to add accepted theaters.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="container mt-5">
      <h1>Theater Requests</h1>
         <div className="row">
        {theaterData.map(theater => (
          <div key={theater.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{theater.theaterName}</h2>
                <p className="card-text">Location: {theater.location}</p>
                <p className="card-text">Ticket Range: {theater.ticketRange}</p>
                <p className="card-text">Ticket Price: {theater.ticketPrice}</p>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleAccept(theater.id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDecline(theater.id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {acceptedTheaters.length > 0 && (
        <div className="mt-4">
          <h2>Accepted Theaters</h2>
          <button
            className="btn btn-primary"
            onClick={handlePostAcceptedTheaters}
          >
            Post Accepted Theaters
          </button>
          <div className="row">
            {acceptedTheaters.map(theater => (
              <div key={theater.id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{theater.theaterName}</h3>
                    <p className="card-text">Location: {theater.location}</p>
                    <p className="card-text">Ticket Range: {theater.ticketRange}</p>
                    <p className="card-text">Ticket Price: {theater.ticketPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
