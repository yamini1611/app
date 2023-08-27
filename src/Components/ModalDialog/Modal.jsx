import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "@mui/material";
import Theater from "../SeatRoom/Theater";

import cycle from "../Assets/Images/cycle.jpg";
import bike3 from "../Assets/Images/bike3.jpg";
import car3 from "../Assets/Images/car3.jpg";
import car4 from "../Assets/Images/car4.jpg";
import car5 from "../Assets/Images/car5.jpg";
import bigcar from "../Assets/Images/bigcar.jpg";
import bus from "../Assets/Images/bus.jpg";

import "../styles/ResponsiveDialog.css";

export default function ResponsiveDialog(props) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [visible, setVisible] = useState(false);
  const [proceedClicked, setProceedClicked] = useState(false);

  const seatImageMap = {
    1: cycle,
    2: bike3,
    3: car3,
    4: car4,
    5: car5,
    6: car5,
    7: bigcar,
    8: bigcar,
    9: bus,
    10: bus,
  };

  const handleSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleProceedClick = () => {
    setVisible(true);
    setProceedClicked(true);
  };

  const renderButton = () => {
    const seats = [];

    for (let i = 1; i <= 10; i++) {
      seats.push(
        <Button
          key={i}
          label={`${i}`}
          className="seat-button"
          text
          raised
          aria-label="Filter"
          onClick={() => handleSelect(i)}
        />
      );
    }
    return seats;
  };

  return (
    <div>
      <div className="responsive-card-container">
        <Card className="md:w-25rem shadow-none m-5">
          <h1 className="text-center" style={{ fontFamily: "Work Sans , sans-serif" }}>
            Kindly declare your seating preference
          </h1>
          <p className="mx-auto container text-center p-5">{renderButton()}</p>
          {selectedSeat !== null && !proceedClicked && (
            <div className="selected-seat-container">
              <img
                src={seatImageMap[selectedSeat]}
                alt={`Seat ${selectedSeat}`}
                className="selected-seat-image"
              />
              <p className="selected-seat-label">Selected Seat: {selectedSeat}</p>
              <button
                className="btn btn-dark mx-auto container"
                onClick={handleProceedClick}
                style={{ fontFamily: "Work Sans , sans-serif" }}
              >
                Proceed
              </button>
            </div>
          )}
        </Card>
      </div>

      <Dialog
        header="Header"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p className="mx-auto container text-center p-5">{renderButton()}</p>
      </Dialog>
      {proceedClicked && selectedSeat !== null && (
        <Theater movieId={props.movieId} noOfSeats={parseInt(selectedSeat)} />
      )}
    </div>
  );
}
