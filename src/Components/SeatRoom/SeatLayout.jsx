import React, { useEffect } from 'react'

const SeatLayout = () => {

  const seats = 100;

  useEffect(()=>{
seats();
  },[])
  seats();

  return (
    <div>
          {seats.map(seat)=>(
           <SeatLay></SeatLay>
          )}

    </div>
  )
}

const seatLay=()=>{
  return
}

export default SeatLayout