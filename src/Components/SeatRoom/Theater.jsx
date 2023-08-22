import React, { useState,useEffect } from "react";
import axios from "axios";
import SeatLayout from "./SeatLayout";
import { Divider } from "@mui/material";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookingSummary from "../BookingSummary/BookingSummary.jsx";


const Theater = (props) => {
  console.log("Inside theater")
  const [rows, setRows] = useState(13);
  const [eliteRows, setEliteRows] = useState(13);
  const [budgetRows, setBudgetRows] = useState(2);

  const [columns, setColumns] = useState(2);
  const [seats, setSeats] = useState(3);
  const [seatsInEachRow, setseatsInEachRow] = useState([]);
  const [ticketCost,setTicketCost]= useState();
  const array = useSelector((state) => state.array);
  const count = useSelector((state) => state.counter)
  var bookingTicket=true;

  const fetchingTickets=()=>{
    axios.get(`http://localhost:4000/SeatsAllocated`)
    .then((response)=>{
      setseatsInEachRow(response.data[0].seatID)
    })
  }

const handleProceed=  ()=>{
   axios.get(`http://localhost:4000/TicketCost`)
  .then((response)=>{
 
    if(array.length>0){
    if(array[0][0]==="E"){
      setTicketCost(response.data[0].Elite*props.noOfSeats);

    }else{
      setTicketCost(response.data[0].Budget*props.noOfSeats)
    }
  }
  })

}
handleProceed();


const handleBookings=()=>{
console.log("Success");
  return(
    <BookingSummary movieId={props.movieId} />
  )
}
  useEffect(()=>{
fetchingTickets();

  },[])



  return (
    <>
    {bookingTicket &&(
    <div>
      <Divider className="text-center  m-4 col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> E l i t e </h6>
      </Divider>

      <SeatLayout noOfSeats={props.noOfSeats}  rows={eliteRows} category="E" />

      <Divider className="text-center  col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> B u d g e t </h6>
      </Divider>
      <SeatLayout noOfSeats={props.noOfSeats} rows={budgetRows} divider={true} category="B" />
{count===props.noOfSeats&&(
      <Card className="mx-auto sticky-bottom">
        <div className="row container mx-auto">
         <Link to='/BookingSummary'>
           <Button className="container" label={`Proceed ${ticketCost} `}  raised onClick={()=>{bookingTicket=true; }} />
           </Link>
           {console.log(count)}
        </div>
      </Card>
      )}     
   
       
    </div>)}

      {(!bookingTicket && (
 <>
  <BookingSummary movieId={props.movieId} />
  </>
))}
    
   
    </>
  );
};

export default Theater;