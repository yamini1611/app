import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ThetreList.css';
import { Link } from 'react-router-dom';

const ThetreList = () => {
  const [selectedLocation, setSelectedLocation] = useState('chennai');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [theaterData, setTheaterData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/ThetreList')
      .then(response => {
        setTheaterData(response.data);
      })
      .catch(error => {
        console.error('Error fetching theater data:', error);
      });
  }, []);

  const filteredTheaters = theaterData.filter(theater => {
    return (
      theater.location.toLowerCase() === selectedLocation &&
      (selectedMovie === '' || theater.MoviesRunning1 === selectedMovie)
    );
  });

  return (
    <div id="thetre-list" className="theatre-list-container">
      <h1>Theatre List</h1>
      <div className="label-container">
        <label className="label" htmlFor="locationSelect">Select Location:</label>
        <select className="select-box" id="locationSelect" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
          <option value="chennai">Chennai</option>
          <option value="mumbai">Mumbai</option>
          <option value="mumbai">Hydrabad</option>
          <option value="mumbai">Cochin</option>
        </select>
      </div>
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card">
            <h3>{theater.Name}</h3>
            <p><strong>Location:</strong> {theater.location}</p>
            <p><strong>Movies Running:</strong> {theater.MoviesRunning1}</p>
           <Link to='/ChooseTickets'> <button className="book-now-button">Book Now</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThetreList;
