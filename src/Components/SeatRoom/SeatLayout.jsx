import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../../Components/styles/seats.css";

function Seater(props) {
  const [checked, setChecked] = useState(false);
  const [seatsClicked, setSeatsClicked] = useState([]);

  const handleSeatClicked = (id) => {
    if (seatsClicked.includes(id)) {
      setSeatsClicked((seatsClicked) => seatsClicked.filter((seat) => seat !== id));
    } else {
      setSeatsClicked((seatsClicked) => [...seatsClicked, id]);
    }
  };

  useEffect(() => {
    console.log(seatsClicked);
    console.log(seatsClicked.length)
  }, [seatsClicked]);

  return (
    <>
      <ToggleButton
        className={`m-1 p-1 seatcheckbox${props.coldivide % 7 === 0 ? ' me-5' : ''}`}
        id={`toggle-check-${props.seatID}`}
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onClick={() => {
          handleSeatClicked(props.seatID);
          setChecked(!checked); // Toggle the checked state
        }}
      >
        {props.num}
      </ToggleButton>
    </>
  );
}

const SeatLayout = (props) => {
  const totalRows = props.rows;
  const seatsPerRow = 20;
  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  const seatRows = [];

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const seatsInRow = [];

    for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
      seatsInRow.push(
        <Seater
          key={seatIndex}
          seatID={props.category + seatIndex + alphabet[rowIndex]}
          num={seatIndex}
          coldivide={seatIndex}
        />
      );
    }

    seatRows.push(
      <div
        key={rowIndex}
        className={`d-flex justify-content-center ${
          rowIndex % 3 === 0 ? "mb-3" : ""
        }`}
      >
        <span className="pt-2 pe-2">{alphabet[rowIndex]} </span>
        {seatsInRow}
      </div>
    );
  }

  return (
    <div className="mx-auto container">
      <div className="col-lg-12 mt-3">{seatRows}</div>
      {props.divider && (
        <Divider className="text-center mt-5 col-lg-5 mx-auto pb-5">
          Here's the screen
        </Divider>
      )}
    </div>
  );
};

export default SeatLayout;
