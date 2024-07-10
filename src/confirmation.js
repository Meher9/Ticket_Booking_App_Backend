import React,{useState} from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { seattonum } from "./book";
import axios from "axios";

export default function ConfirmationComponent(){
    const [movie,setMovie] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const values = location.state
    const seats = values.seatNumbers
    const dict = {
        0:'11:40 AM',
        1:'03:30 PM',
        2:'07:00 PM',
        3:'10:50 PM'
    }
    let s = document.cookie.toString().slice(6)
    const seatnum = seats.map(ele => seattonum(ele))
    var response = axios.get('https://ticket-booking-app-nodejs.herokuapp.com/user/theater',{
        headers:{
            'x-access-token':s
        }
    }).then(res => res.data).then(res => {
        for(let i=0;i<res.length;i++){
            if(values.name==res[i].name){
                setMovie(res[i].movieRunning[values.movie])
            }
        }
    })
    return(
        <>
        <div className="backp">
        <div className="ticket-summary flex-column">
            <div className="title">{movie}</div>
            <div className="theatername">{values.name} - {dict[values.movie]}</div>
            <div>Seats - {seatnum.join(", ")} ({seats.length} Tickets)</div>
            <div className="amount"><span>Amount:&ensp;Rs.</span><span>{seatnum.length*(30+120.25)}</span></div>
            <div className="paynow"><button onClick={(e) => navigate('/dashboard')}>Back to Home</button></div>
        </div>
        </div>
        </>
    )
}