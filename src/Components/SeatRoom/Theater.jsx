import React, { useState } from "react";
import SeatLayout from "./SeatLayout";
import { Divider } from "@mui/material";

const Theater = () => {
  const [rows, setRows] = useState(13);
  const [eliteRows, setEliteRows] = useState(13);
  const [budgetRows, setBudgetRows] = useState(2);

  const [columns, setColumns] = useState(2);
  const [seats, setSeats] = useState(3);
  const [seatsInEachRow, setseatsInEachRow] = useState([]);

  return (
    <div>
         <Divider className="text-center  m-4 col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> E l i t e </h6>
      </Divider>
      <SeatLayout rows={eliteRows} category="E"/>       

      <Divider className="text-center  col-lg-5 mx-auto p-1">
        <h6 className="text-secondary mt-2"> B u d g e t </h6>
      </Divider>
      <SeatLayout rows={budgetRows} divider={true} category="B" />
    </div>
  );
};

export default Theater;
