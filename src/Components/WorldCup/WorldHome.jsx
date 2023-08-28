import React, { useEffect, useState } from "react";
import "../styles/WorldHome.css";
import axios from "axios";

const WorldHome = () => {
  const [teams, setTeams] = useState([]);
  const [venues,setVenues] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/Teams");
      setTeams(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  useEffect(()=>{
    fetchVenues();
  },[])

  const fetchVenues=async()=>{
    try{
    const response=await axios.get(' http://localhost:4000/venues')
    setVenues(response.data)
    }
    catch(error){
      console.log("An error Occured",error)
    }
  }

  return (
    <div className="world-container-fluid">
      <div className="container world-container">
        <div className="row">
          <div className="col-12 	d-none d-sm-block">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/cwc-icc-logo-web-collection-202308190313.png"
              alt="Banner"
              className="img-fluid mt-3 curved-image "
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-240:q-80/cwc-view-all-matches-web-collection-202308190127.png"
              alt="Banner"
              className="img-fluid curved-image2 mt-3"  
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="text">Find Matches By Team</h1>
          </div>
        </div>
        <div className="row mt-5">
          {teams.map((team) => (
            <div key={team.id} className="col-4 col-md-3 mb-4">
              <div className="flag-card">
                <img 
                  src={team.Flag}
                  alt="country"
                  className="flag-img"
                />
                {/* <div className="country-name">{team.country}</div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <p className="text-white">Find Mathches by Venue</p>
          </div>
        </div>
        <div className="row mt-5">
          {venues.map((venue)=>(
            <div key={venue.id} className="col-4 col-md-3 mb-4">
              <div className="venue-card">
                <img
                src={venue.image}
                alt="venues"
                className="vemue-img"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <img
            src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-240:q-80/cwc-partners-web-collection-202308240228.png"
            alt="sponsers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldHome;
