import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectedTheaters = ({ selectedLocation, selectedMovie }) => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Fetch theater list from the API
    axios.get('http://localhost:4000/ThetreList')
      .then(response => {
        // Convert selectedLocation to lowercase for case-insensitive comparison
        const lowerCaseSelectedLocation = selectedLocation.toLowerCase();

        console.log('Selected location:', selectedLocation);
        console.log('Selected movie:', selectedMovie);
        console.log('Theater data:', response.data);

        // Filter theaters based on selected location and movie
        const filteredTheaters = response.data.filter(theater =>
          theater.location.toLowerCase() === lowerCaseSelectedLocation && theater.MoviesRunning1.includes(selectedMovie)
        );

        console.log('Filtered theaters:', filteredTheaters);

        setTheaters(filteredTheaters);
      })
      .catch(error => {
        console.error('Error fetching theater list:', error);
      });
  }, [selectedLocation, selectedMovie]);

  return (
    <div>
      <h2>Selected Theaters</h2>
      {theaters.length > 0 ? (
        <ul>
          {theaters.map(theater => (
            <li key={theater.Name}>
              <h3>{theater.Name}</h3>
              <p>Location: {theater.location}</p>
              <p>Movies: {theater.MoviesRunning1}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No theaters found for the selected location and movie.</p>
      )}
    </div>
  );
};

export default SelectedTheaters;
