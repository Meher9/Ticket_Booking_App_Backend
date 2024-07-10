import React,{useState} from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './movies.css';

export default function MoviesComponent(){
    const urlParams = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let date = new Date();
    let datearr = []
    for(let i=0;i<7;i++){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let obj = {date:`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`, day:days[date.getDay()]}
        datearr.push(obj)
        date.setDate(date.getDate() + 1) 
    }
    const [theaters,setTheaters] = useState([])
    let s = document.cookie.toString().slice(6)
    var response = axios.get(`https://ticket-booking-app-nodejs.herokuapp.com/user/movies/${urlParams.moviename}`,{
        headers:{
            'x-access-token':s
        }
    }).then(res => setTheaters(res.data))
    const [dateofBooking,setDate] = useState(datearr[0].date)
    const [newstate,setNewState] = useState(true)
    const dict = {
        0:'11:40 AM',
        1:'03:30 PM',
        2:'07:00 PM',
        3:'10:50 PM'
    }
    return(
        <>
        <div className="date-of-shows">
            <form>
                <div class="switch-field">
                {
                    datearr.map((ele) =>{
                        if(datearr[0]===ele && newstate===true){
                            return(
                            <><input type="radio" id={ele.date} name="date" value={ele.date} checked onClick={(e)=> {
                                setDate(ele.date)
                                setNewState(false)
                                }}/>
                            <label for={ele.date}>{ele.date}<br></br>{ele.day}</label></>)
                        }
                        else{
                            return(
                            <><input type="radio" id={ele.date} name="date" value={ele.date} onClick={(e)=> {
                                setDate(ele.date)
                                setNewState(false)
                                }}/>
                            <label for={ele.date}>{ele.date}<br></br>{ele.day}</label></>)
                        }
                        
                    } 
                    
                )
                }
                </div>
            </form>
        </div>
        <div className="moviename">{urlParams.moviename}</div>
        <div className="theaterlist-for-movies">
            {theaters.map(ele => <>
        <div className="theater-for-movies">
            <div className="theater-name">{ele.name}</div>
            <div className="showtiming">
                {ele.show.map(elem =><button className="timing-buttons" onClick={(e) => navigate(`/${ele.name}/${elem}/${dateofBooking}`)}>{dict[elem]}</button>)}
            </div>
        </div>
        </>)}
        </div>
        </>
    )
}
