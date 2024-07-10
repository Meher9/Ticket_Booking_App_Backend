import React from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { seattonum } from "./book";
import './payment.css'

export default function Payment(){
    const urlParams = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const values = location.state
    const seats = values.seatNumbers
    const seatnum = seats.map(ele => seattonum(ele))
    let s = document.cookie.toString().slice(6)
    const pay = async () => {
        var response = axios.post(`https://ticket-booking-app-nodejs.herokuapp.com/user/book`,{
            name:values.name,
            date:values.date,
            movie:parseInt(values.movie),
            seatNumbers:values.seatNumbers
        },{
            headers:{
                'x-access-token':s
            }
        }).then(res => navigate('/confirmation',{state:values}))
    }
    return(
        <>
        <div className="backp">
        <div className="ticket-summary">
            <div className="bill-details">
                <div className="billheading">Booking Summary</div><div className="billheading">Amount</div>
                <div>Seats - {seatnum.join(", ")} ({seats.length} Tickets)</div>
                <div>{seats.length*120.25}</div>
                <div>Convinece fee:</div><div>{seats.length*30}</div>
                <div>Total:</div><div>{seatnum.length*(30+120.25)}</div>
                <div className="paynow"><button onClick={() => pay()}>Pay Now</button></div>
            </div>
        </div>
        </div>
        </>
    )
}