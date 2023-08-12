import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "../../Components/styles/seats.css";

function Seater(props) {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleButton
      className={`m-1 seatcheckbox${props.num % 5 === 0 ? ' me-5' : ''}`}
      id={`toggle-check-${props.num}`}
      type="checkbox"
      variant="outline-primary"
      checked={checked}
      value="1"
      onChange={(e) => setChecked(e.currentTarget.checked)}
    >
      {props.num}
    </ToggleButton>
  );
}

const SeatLayout = () => {
  const totalRows = 6; // Define the total number of rows
  const seatsPerRow = 20;
  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  const seatRows = [];

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const seatsInRow = [];

    for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
      seatsInRow.push(<Seater key={seatIndex} num={seatIndex} />);
    }

    seatRows.push(
      <div key={rowIndex} className="d-flex justify-content-center">
        <span className='pt-3 '>{alphabet[rowIndex]}</span>
        {seatsInRow}
      </div>
    );
  }

  return (
    <div className='mx-auto container'>
      <div className='col-lg-12'>
        {seatRows}
      </div>

      <Divider className="text-center fixed-bottom col-lg-5 mx-auto pb-5">Here's the screen</Divider>
    </div>
  );
}

export default SeatLayout;
