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

	// const seatName = () => {
	// 	if (array[0][0] === "E") {
	// 		return ("Elite")
	// 	} else {
	// 		return ("Budget");
	// 	}
	// }

	// seatName();




	const logInCheck = () => {

		axios.get("http://localhost:4000/Register/?isLogged=true")
			.then((response) => {

				setEmail(response.data[0].email);
				console.log(response.data[0].email)

				axios.get(`http://localhost:4000/Payment/?email=${response.data[0].email}`)
					.then((response) => {
						setTickDetails(response.data[0]);
					});

			});


	}
// 	var code = '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101'

// table = $('.barcode tr');
// for(var i = 0; i < code.length; i++) {
// 	if( code[i]==1 ) {
// 		table.append('<td bgcolor="black">')
// 	} else {
// 		table.append('<td bgcolor="white">')
// 	}
// }

useEffect(()=>{
	logInCheck();

},[])

	return (
<>
		{tickDetails && (
		
		<div className='tick' style={{fontFamily: "Work Sans , sansserif"}}>
<div class="ticket">
	<div class="holes-top"></div>
	<div class="title">
		
		<p class="cinema">Tentukotta Cinemas</p>
		<div className="d-flex">
		<p className='fonte'>{tickDetails.movieName} - </p>
		<p className='fonte' > {tickDetails.language}</p>
		</div>
		
	</div>
	<div class="poster">
		<img src={tickDetails.image} alt="Movie Image" />
	</div>
	<div class="info">
	<table>
		<tr>
			<th>Seat</th>
			
		</tr>
		<tr>
			<td class="bigger">{tickDetails.seatCategory}</td>
			<td class="bigger">{tickDetails.seatings.join(",")}</td>
		</tr>
	</table>
	<table>
		<tr>
			<th>PRICE</th>
			<th>DATE</th>
			<th>TIME</th>
		</tr>
		<tr>
			<td>$12.00</td>
			<td>1/13/17</td>
			<td>19:30</td>
		</tr>
	</table>
	</div>
	<div class="holes-lower"></div>

</div>
</div>
		)} 
</>

	)
}

export default BookingSummary