
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Theater from "../SeatRoom/Theater";
import { Card } from 'primereact/card';
export default function ResponsiveDialog(props) {
  const [visible, setVisible] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState("");
    const [count, setCount] = useState(0);
  const handleSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const renderButton = () => {
    var seats = [];

    for (let i = 1; i <= 10; i++) {
      seats.push(
        <Button
          key={i}
          label={`${i}`}
          className="mx-1 col-lg-0"
          text
          raised
          aria-label="Filter"
          onDoubleClick={() => {handleSelect(i);setVisible(false);setCount(1);}}
        />
      );
    }
    return seats;
  };

  return (
    <div >
{count===0?(
    
    <div className="card flex justify-content-center col-lg-6 mx-auto m-5">
            <Card  className="md:w-25rem shadow-none m-5">
                <h1 className="text-center">Kindly declare your seating preference</h1>
            <p className="mx-auto container text-center p-5">{renderButton()}</p>
          
            </Card>
        </div>
   
    
):(
    <Card className="shadow-none bg-black rounded-0 p-0 border-radius-none">
        <Button
        label={`${selectedSeats} Tickets `}
        icon="fa-solid fa-pencil"
        
        className="col-lg-1 m-0 p-0 text-white"
        onClick={() => setVisible(true)}
      text> </Button>
        </Card>
)}
        
      
      <Dialog
        header="Header"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p className="mx-auto container text-center p-5">{renderButton()}</p>
      </Dialog>
      {selectedSeats !== "" && <Theater noOfSeats={parseInt(selectedSeats)}/>}
    </div>
  );
}