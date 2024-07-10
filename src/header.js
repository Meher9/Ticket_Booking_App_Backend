import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function Header() {
    const navigate = useNavigate()
    const signout = (e) => {
        var response = axios.get('https://ticket-booking-app-nodejs.herokuapp.com/user/signout').then(res=>navigate('/login'))
    }
    return (
        <>
            <div className="header"><div className="title-dashboard">Ticket Booker</div><div className="signout"><button onClick={(e) => signout(e)}><span>Signout</span></button></div></div>
        </>
    )
}