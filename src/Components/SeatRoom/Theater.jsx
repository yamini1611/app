import React, { useState,useEffect } from "react";
import axios from "axios";
import SeatLayout from "./SeatLayout";
import { Divider } from "@mui/material";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { arrayReducer } from "../ReduxToolKit/counterSlice";
import { useDispatch, useSelector } from "react-redux";


const Theater = (props) => {
  console.log("Inside theater")
  const [rows, setRows] = useState(13);
  const [eliteRows, setEliteRows] = useState(13);
  const [budgetRows, setBudgetRows] = useState(2);

  const [columns, setColumns] = useState(2);
  const [seats, setSeats] = useState(3);
  const [seatsInEachRow, setseatsInEachRow] = useState([]);
  const array = useSelector((state) => state.array);

  const fetchingTickets=()=>{
    axios.get(`http://localhost:4000/SeatsAllocated`)
    .then((response)=>{
      setseatsInEachRow(response.data[0].seatID)
    })
  }
  useEffect(()=>{
fetchingTickets();

  },[])



  return (
    <div>
      <Divider className="text-center  m-4 col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> E l i t e </h6>
      </Divider>

      <SeatLayout noOfSeats={props.noOfSeats}  rows={eliteRows} category="E" />

      <Divider className="text-center  col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> B u d g e t </h6>
      </Divider>
      <SeatLayout noOfSeats={props.noOfSeats} rows={budgetRows} divider={true} category="B" />

      <Card className="mx-auto sticky-bottom">
        <div className="row container mx-auto">
          <Button label="Proceed" raised />
        </div>
        <div className="col-lg-1">

      </div>
      </Card>
      
      {console.log(seatsInEachRow)}     
    </div>
  );
};

export default Theater;