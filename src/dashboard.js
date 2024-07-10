import React, { useState } from "react";
import './dashboard.css'
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
    return (
        <>
        <div className="section">
        <TheaterComponent/>
        <MovieComponent/>
        </div>
        </>
    )
}



function MovieComponent() {
    const navigate = useNavigate()
    const [movies,setMovies] = useState([])
    let s = document.cookie.toString().slice(6)
    var response = axios.get('https://ticket-booking-app-nodejs.herokuapp.com/user/movies',{
        headers:{
            'x-access-token':s
        }
    }).then(res=>setMovies(res.data)).catch((err) => {
        if(err.response.status===401){
            navigate('/login')
        }})
    return(
        <>
        <div className="movie-comp">
        <div className="heading-dashboard">Movies</div>
        <div className="movielist">
            {movies.map(element => <MovieCard name={element.name}/>)}
        </div>
        </div>
        </>
    )
}

function MovieCard(props){
    const navigate = useNavigate()
    return(<>
        <div className="card">
        <img src="https://dummyimage.com/300x200/dee2e6/6c757d.jpg"></img>
        <div className="card-content"><div className="card-movie-title">{props.name}</div><div className="card-book-now-button-dashboard"><button onClick={(e) => navigate(`/movie/${props.name}`)}>Book Now</button></div></div>
        
        </div>
        </>
    )
}

function TheaterComponent(){
    const navigate = useNavigate()
    const [theaters,setTheater]=useState([])
    let s = document.cookie.toString().slice(6)
    var response = axios.get('https://ticket-booking-app-nodejs.herokuapp.com/user/theater',{
        headers:{
            'x-access-token':s
        }
    }).then(res=>setTheater(res.data))
    return(
        <>
        <div className="theaterlist-component">
            <div className="theater-heading-dashboard">Theaters</div>
                <div className="theaterlist-list">
            {theaters.map(element => <><a onClick={(e)=>navigate(`/theaters/${element.name}`)}>{element.name}</a><br></br></>)}
            </div>
        </div>
        </>
    )
}