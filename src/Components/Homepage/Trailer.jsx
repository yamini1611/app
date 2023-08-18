import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Trailer = () => {
  const [display, setDisplay] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/HindiMovies/${id}`)
      .then((response) => response.json())
      .then((data) => setDisplay(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div>
      <div style={{backgroundColor: "#050320fd"}}>
        {display.Trailer && (
         <iframe
         title="Movie Trailer"
         width={1341}
         height={710}
         src={`${display.Trailer}?autoplay=1&mute=1&fs=1&rel=0`}
         allowFullScreen
       ></iframe>
        )}
      </div>
    </div>
  );
};

export default Trailer;


export const TamilTrailer = () =>
{
    const [Tamil, settamil] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/TamilMovies/${id}`)
            .then((response) => response.json())
            .then((data) => settamil(data))
            .catch((error) => console.error("Error fetching data:", error));
    },[])
    return (
        <div>
          <div style={{backgroundColor: "#050320fd"}}>
            {Tamil.Trailer && (
             <iframe
             title="Movie Trailer"
             width={1519}
             height={710}
             src={`${Tamil.Trailer}?autoplay=1&mute=1&fs=1&rel=0`}
             allowFullScreen
           ></iframe>
            )}
          </div>
        </div>
      );
 
}

export const MalayalamTrailer =() =>
{
    const [Malayalam, setMalayalam] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/MalayalamMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setMalayalam(data))
            .catch((error) => console.error("Error fetching data:", error));
    },[])


    return(
        <div>
        <div style={{backgroundColor: "#050320fd"}}>
          {Malayalam.Trailer && (
           <iframe
           title="Movie Trailer"
           width={1519}
           height={710}
           src={`${Malayalam.Trailer}?autoplay=1&mute=1&fs=1&rel=0`}
           allowFullScreen
         ></iframe>
          )}
        </div>
      </div>
    )
}

export const TeluguTrailer = () =>
{
    const [Telugu, setTelugu] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/TeluguMovies/${id}`)
            .then((response) => response.json())
            .then((data) => setTelugu(data))
            .catch((error) => console.error("Error fetching data:", error));
    },[])
    return(
        <div>
        <div style={{backgroundColor: "#050320fd"}}>
          {Telugu.Trailer && (
           <iframe
           title="Movie Trailer"
           width={1519}
           height={710}
           src={`${Telugu.Trailer}?autoplay=1&mute=1&fs=1&rel=0`}
           allowFullScreen
         ></iframe>
          )}
        </div>
      </div>
    )

}