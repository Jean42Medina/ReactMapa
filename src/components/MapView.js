import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import { useLocation, useHistory } from "react-router-dom";



const Nosotros = () => {
  const[equipo,setEquipo] = React.useState([])

  React.useEffect(() => {
    //console.log('useEffect')
    obtenerDatos()
  },[])

	const obtenerDatos = async ()=>{
		const data = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
		const users = await data.json()
		setEquipo(users)
  }
  
 return(
	<div>
		<h1>nosotros</h1>
		<ul>
        {
		      equipo.map(item => (
			    <li key='item.id'>{item.name} - {item.email}</li>
          ))
        }
    </ul> 

     </div>
 )}

  





const MapView = (props) => {
  const [state, setState] = useState({
    currentLocation: { lat: -0.310018, lng: -78.545822 },
    zoom: 13,
    data,
  });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      console.log(state);
      setState({
        ...state,
        data: {
          venues: state.data.venues.concat({
            name: "new",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      });
      history.replace({
        pathname: "/map",
        state: {},
      });
    }
  }, [location]);

  return (
    <Map center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
    </Map>
  );
};

export default MapView;
