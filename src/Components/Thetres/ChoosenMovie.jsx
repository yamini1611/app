import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ChooseTickets from "../SeatRoom/ChooseTickets";
import "../styles/ThetreList.css";


const ChooseTamilmovie =() =>
{
    const [Tamil, settamil] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/TamilMovies/${id}`)
            .then((response) => response.json())
            .then((data) => settamil(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {
        axios
          .get("http://localhost:4000/ThetreList")
          .then((response) => {
            setTheaterData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching theater data:", error);
          });
      }, []);

      const filteredTheaters = theaterData.filter((theater) => {
        return (
          theater.location=== Tamil.location &&
          theater.MoviesRunning1 === Tamil.Name
        );
      });
      
      const handleShow=(id)=>{


        return(
          <div>
             <ChooseTickets movieId={id}/>
          </div>
        )
      }

      
return(
    <div id='iddiv'>
   <div id="theatre-list" className="theatre-list-container">
      <h1 className="heading" >{Tamil.Name}</h1>
      
      {filteredTheaters.length === 0 ? (
        <div>
      <p>No theater found.</p>
      <img src="https://assets-in.bmscdn.com/coupon/journey/coupon-weird.png" alt=""></img></div>
    ) : (
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <h3 className="theatre-name">{theater.Name}</h3>
            <img src={theater.cover} alt={`${theater.Name} Cover`} className="cover-image" />
            <p>
              <span className="movie-name">{theater.MoviesRunning1}</span>
            </p>
            <div className="show-times">
              <p>
                <strong>Show Timings:</strong>
              </p>
              {/* <Link to="/ChooseTickets" className="text-decoration-none"> */}
             
                <ul className="show-list no-underline">
                  <li onClick={()=>{handleShow(Tamil.id)}}>{theater.show1}</li>
                  <li onClick={()=>{handleShow()}}>{theater.show2}</li>
                  <li onClick={()=>{handleShow()}}>{theater.show3}</li>
                  <li onClick={()=>{handleShow()}}>{theater.show4}</li>
                  <li onClick={()=>{handleShow()}}>{theater.show5}</li>
                </ul>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
)
}

export default ChooseTamilmovie;

export const ChooseHindiMovie =() =>
{

    const [Hindi, setHindi] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/HindiMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setHindi(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {
        axios
          .get("http://localhost:4000/ThetreList")
          .then((response) => {
            setTheaterData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching theater data:", error);
          });
      }, []);

      const filteredTheaters = theaterData.filter((theater) => {
        return (
          theater.location=== Hindi.location&&
          theater.MoviesRunning1 === Hindi.Name 
         
        );
      });
      

      
return(
    <div id='iddiv'>
   <div id="theatre-list" className="theatre-list-container">
      <h1 className="heading">{Hindi.Name}</h1>
      
      {filteredTheaters.length === 0 ? (
  <div>
  <p>No theater found.</p>
  <img src="https://assets-in.bmscdn.com/coupon/journey/coupon-weird.png" alt=""></img></div>
    ) : (
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <h3 className="theatre-name">{theater.Name}</h3>
            <img src={theater.cover} alt={`${theater.Name} Cover`} className="cover-image" />
            <p>
              <span className="movie-name">{theater.MoviesRunning1}</span>
            </p>
            <div className="show-times">
              <p>
                <strong>Show Timings:</strong>
              </p>
              <Link to="/ChooseTickets" className="text-decoration-none">
             
                <ul className="show-list no-underline">
                  <li>{theater.show1}</li>
                  <li>{theater.show2}</li>
                  <li>{theater.show3}</li>
                  <li>{theater.show4}</li>
                  <li>{theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
)

}


export const ChooseTelugumovie =() =>
{
    const [Telugu, setTelugu] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/TeluguMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setTelugu(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {
        axios
          .get("http://localhost:4000/ThetreList")
          .then((response) => {
            setTheaterData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching theater data:", error);
          });
      }, []);

      const filteredTheaters = theaterData.filter((theater) => {
        return (
          theater.location=== Telugu.location &&
          theater.MoviesRunning1 === Telugu.Name
        );
      });
      

      
return(
    <div id='iddiv'>
   <div id="theatre-list" className="theatre-list-container">
      <h1 className="heading">{Telugu.Name}</h1>
      
      {filteredTheaters.length === 0 ? (
     <div>
     <p>No theater found.</p>
     <img src="https://assets-in.bmscdn.com/coupon/journey/coupon-weird.png" alt=""></img></div>
    ) : (
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <h3 className="theatre-name">{theater.Name}</h3>
            <img src={theater.cover} alt={`${theater.Name} Cover`} className="cover-image" />
            <p>
              <span className="movie-name">{theater.MoviesRunning1}</span>
            </p>
            <div className="show-times">
              <p>
                <strong>Show Timings:</strong>
              </p>
              <Link to="/ChooseTickets" className="text-decoration-none">
             
                <ul className="show-list no-underline">
                  <li>{theater.show1}</li>
                  <li>{theater.show2}</li>
                  <li>{theater.show3}</li>
                  <li>{theater.show4}</li>
                  <li>{theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
)
}


export const ChooseMalayalmmovie =() =>
{
    const [Malayalam, setMalayalam] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/MalayalamMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setMalayalam(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

    useEffect(() => {
        axios
          .get("http://localhost:4000/ThetreList")
          .then((response) => {
            setTheaterData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching theater data:", error);
          });
      }, []);

      const filteredTheaters = theaterData.filter((theater) => {
        return (
          theater.location=== Malayalam.location &&
          theater.MoviesRunning1 === Malayalam.Name
        );
      });
      

      
return(
    <div id='iddiv' >
   <div id="theatre-list" className="theatre-list-container">
      <h1 className="heading">{Malayalam.Name}</h1>
      
      {filteredTheaters.length === 0 ? (
 <div>
 <p>No theater found.</p>
 <img src="https://assets-in.bmscdn.com/coupon/journey/coupon-weird.png" alt=""></img></div>    ) : (
      <div className="theatre-cards">
        {filteredTheaters.map((theater, index) => (
          <div key={index} className="card" id='card'>
            <h3 className="theatre-name">{theater.Name}</h3>
            <img src={theater.cover} alt={`${theater.Name} Cover`} className="cover-image" />
            <p>
              <span className="movie-name">{theater.MoviesRunning1}</span>
            </p>
            <div className="show-times">
              <p>
                <strong>Show Timings:</strong>
              </p>
              <Link to="/ChooseTickets" className="text-decoration-none">
             
                <ul className="show-list no-underline">
                  <li>{theater.show1}</li>
                  <li>{theater.show2}</li>
                  <li>{theater.show3}</li>
                  <li>{theater.show4}</li>
                  <li>{theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
)
}