import React, { createContext, useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../../Components/styles/seats.css";
import axios from "axios";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, setBookings, selectBookings } from "../ReduxToolKit/counterSlice";

import { arrayReducer } from "../ReduxToolKit/counterSlice";

export const seatContext = createContext();


function Seater(props) {

  const [checked, setChecked] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(0);
  const count = useSelector((state) => state.counter);
  const array = useSelector((state) => state.array);
  const addItem = (item) => ({ type: "add", payload: item });
  const popItem = (item) => ({ type: "pop", payload: item });
  const resetItem = (item) => ({ type: 'reset', payload: item });
  const movieName = useSelector(selectBookings);
  const dispatch = useDispatch();

  // dispatch(setBookings(props.movieId));

  const handleSeatClicked = (id) => {
    console.log("hej")
    dispatch((addItem(id)))
    console.log(array)
    console.log(count.count)
  }


console.log(array)


  return (
    <>

      {count.count < props.noOfSeats || array.find((item)=>item===props.seatID)
        ?
        (<ToggleButton
          className={`m-1 p-1 seatcheckbox${props.coldivide % 7 === 0 ? " me-5" : ""
            }`}
          id={`toggle-check-${props.seatID}`}
          type="checkbox"
          variant="outline-primary"

          checked={checked}
          value="1"
          onClick={() => {
         
            setChecked(!checked);
            if (count.count < props.noOfSeats) {



              // setChecked(!checked);

              if (!checked) {
               
                dispatch(increment());
                dispatch((addItem(props.seatID)))
              console.log(count.count)

              } else {
                dispatch(decrement());
                dispatch(popItem(props.seatID))
              }


            }else{
              console.log(count.count,props.noOfSeats)
            }
            
          }}
        >

          {props.num}
        </ToggleButton>) : (<ToggleButton
          className={`m-1 p-1 seatcheckbox${props.coldivide % 7 === 0 ? " me-5" : ""
            }`}
          id={`toggle-check-${props.seatID}`}
          type="checkbox"
          variant="outline-primary"
          value="1"
        // onClick={() => {
        //   dispatch(reset());
        //   dispatch(resetItem(props.seatID))
        // }}
        >
          {/* {console.log(count)} */}
          {console.log("hey")}
          {props.num}
        </ToggleButton>)
      }

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