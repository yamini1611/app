import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ChooseTickets from "../SeatRoom/ChooseTickets";
import "../styles/ThetreList.css";
import { setMovieCategory } from "../ReduxToolKit/counterSlice";
import { useDispatch } from "react-redux";

const ChooseTamilmovie =() =>
{
    const [Tamil, settamil] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [showChooseTickets, setShowChooseTickets] = useState(true);
    const dispatch = useDispatch();
  

    useEffect(() => {

        fetch(`http://localhost:4000/TamilMovies/${id}`)
            .then((response) => response.json())
            .then((data) => settamil(data))
            .then(()=>dispatch(setMovieCategory("TamilMovies")))
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
        setShowChooseTickets(false)
        
      }

      
return(
  <>{showChooseTickets ? (
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
              
                 <ul className="show-list no-underline">
                   <li onClick={()=>{handleShow(Tamil.id)}}>{theater.show1}</li>
                   <li onClick={()=>{handleShow()}}>{theater.show2}</li>
                   <li onClick={()=>{handleShow()}}>{theater.show3}</li>
                   <li onClick={()=>{handleShow()}}>{theater.show4}</li>
                   <li onClick={()=>{handleShow()}}>{theater.show5}</li>
                 </ul>
               {/* {/ </Link> /} */}
             </div>
           </div>
         ))}
       </div>
     )}
     </div>
     </div>
  ):(<ChooseTickets movieId={Tamil.id}/>)}
  </>
)
}

export default ChooseTamilmovie;

export const ChooseHindiMovie =() =>
{

    const [Hindi, setHindi] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [showChooseTickets, setShowChooseTickets] = useState(true);

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
      
      const handleShow=(id)=>{
        setShowChooseTickets(false)
        
      }

      
return(
  <>{showChooseTickets ? (
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
                  <li  onClick={()=>{handleShow(Hindi.id)}}>{theater.show1}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show2}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show3}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show4}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
     ):(<ChooseTickets movieId={Hindi.id}/>)}
     </>
)

}


export const ChooseTelugumovie =() =>
{
    const [Telugu, setTelugu] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [showChooseTickets, setShowChooseTickets] = useState(true);

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
      

      const handleShow=(id)=>{
        setShowChooseTickets(false)
        
      }

return (
  <>{showChooseTickets ? (

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
                  <li  onClick={()=>{handleShow(Telugu.id)}}>{theater.show1}</li>
                  <li  onClick={()=>{handleShow()}}> {theater.show2}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show3}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show4}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
    ):(<ChooseTickets movieId={Telugu.id}/>)}
    </>
)
}


export const ChooseMalayalmmovie =() =>
{
    const [Malayalam, setMalayalam] = useState([]);
    const { id } = useParams();
    const [theaterData, setTheaterData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [showChooseTickets, setShowChooseTickets] = useState(true);

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
      
      const handleShow=(id)=>{
        setShowChooseTickets(false)
        
      }

      
return(
  <>{showChooseTickets ? (

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
                  <li  onClick={()=>{handleShow(Malayalam.id)}}>{theater.show1}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show2}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show3}</li>
                  <li  onClick={()=>{handleShow()}}>{theater.show4}</li>
                  <li  onClick={()=>{handleShow()}}> {theater.show5}</li>
                </ul>
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
    </div>
    ):(<ChooseTickets movieId={Malayalam.id}/>)}
    </>
)
}