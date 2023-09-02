import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import '../styles/BookingSummary.css'
import axios from 'axios';


const BookingSummary = (props) => {
	const bookedSeats = useSelector((state) => state.array);
	const [ticketDetails, setTicketDetails] = useState();
	const [ticketCost, setTicketCost] = useState();
	const [tickDetails, setTickDetails] = useState({});

	const array = useSelector((state) => state.array);
	const [email, setEmail] = useState();






	const logInCheck = () => {

				axios.get(`http://localhost:4000/Payment`)
					.then((response) => {
						setTickDetails(response.data[response.data.length-1]);
						console.log(response.data[response.data.length-1])
					});

	}
// // 	var code = '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101'

// // table = $('.barcode tr');
// // for(var i = 0; i < code.length; i++) {
// // 	if( code[i]==1 ) {
// // 		table.append('<td bgcolor="black">')
// // 	} else {
// // 		table.append('<td bgcolor="white">')
// // 	}
// // }

useEffect(()=>{
	logInCheck();

},[])

	return (
<>
		{tickDetails && (
		
	<div className='tickbackground col-lg-12' style={{fontFamily:"Work Sans, sans-serif"}}>
		<h1 className='text-center display-5 text-white'>Pick Your ticket!</h1>
		<div className='p-5'>
<div class="ticket">
	<div class="holes-top mb-4"></div>
		

	<div class="title">
	<h6>Tentukotta Cinemas</h6>
<div className='d-flex'>
	<h5>{tickDetails.movieName} - </h5>

	<h5>{tickDetails.language}</h5>
	</div>
	</div>
	<div class="poster">
		<img src={tickDetails.image} alt="Movie: Only God Forgives" />
	</div>
	<div class="info">
	<table>
		<tr>
			<th>Seat</th>
			
		</tr>
		<tr>
			<td class="bigger">{tickDetails.seatCategory}</td>
			{/* <td class="bigger">{tickDetails.seatings.join(",")}</td> */}
		</tr>
	</table>
	<table>
		<tr>
			<th>PRICE</th>
			<th>DATE</th>
			<th>TIME</th>
		</tr>
		<tr className='mt-5'>
			<td>&#8377; {tickDetails.cost}</td>
			<td>1/13/17</td>
			<td>19:30</td>
		</tr>
	</table>
	</div>
	<div class="holes-lower mt-0"></div>
	
</div>
</div>
</div>
		 )} 
</>

	)
}

export default BookingSummary