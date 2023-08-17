
import React, { createContext, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../../Components/styles/seats.css";
import axios from "axios";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from "../ReduxToolKit/counterSlice";

export const seatContext = createContext();

function Seater(props) {

  const [seatArr, setSeatArr] = useState([]);
  const [checked, setChecked] = useState(false);
  const [seatsClicked, setSeatsClicked] = useState();
  const count = useSelector((state)=>state.counter)
  const dispatch = useDispatch();
  



  const handleSeatClicked = (id) => {



    axios.get(`http://localhost:4000/SeatsAllocated`).then((response) => {

      if (response.data[0].seatID.includes(id)) {

        axios.put(`http://localhost:4000/SeatsAllocated/1`, {
          //If the seat is already booked, then remove it from the array
          seatID: [].concat(
            response.data[0].seatID.filter((seat) => seat !== id)
          ),
        });
      } else {
        axios.put(`http://localhost:4000/SeatsAllocated/1`, {
          //If the seat is not booked then append it to the seat list
          seatID: [].concat(response.data[0].seatID, id),
        });
      }
    });
  };


  return (
    <>

      <ToggleButton
        className={`m-1 p-1 seatcheckbox${props.coldivide % 7 === 0 ? " me-5" : ""
          }`}
        id={`toggle-check-${props.seatID}`}
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onClick={() => {

          if (count <= props.noOfSeats) {
            handleSeatClicked(props.seatID);
            setSeatArr(props.seatID);
            console.log(count)
            setChecked(!checked);
            // if(checked){
              dispatch(increment());
            // }else{
              // dispatch(decrement());

            // } 
            console.log(count + " After increase")
          }
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
          noOfSeats={props.noOfSeats}
        />
      );
    }

    seatRows.push(
      <div
        key={rowIndex}
        className={`d-flex justify-content-center ${rowIndex % 3 === 0 ? "mb-3" : ""
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