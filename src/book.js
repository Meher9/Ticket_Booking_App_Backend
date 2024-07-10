import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import classes from "./book.css"

export default function BookTicketComponent(){
    const urlParams = useParams()
    const navigate = useNavigate()
    const normalSeats = createSeats(10, '1');
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    let s = document.cookie.toString().slice(6)
    var response = axios.get(`https://ticket-booking-app-nodejs.herokuapp.com/admin/bookedShows/${urlParams.theatername}/${urlParams.movie}/${urlParams.date}`,{
        headers:{
            'x-access-token':s
        }
    }).then(res => {
        if(res.data!==[]){
            setBookedSeats(res.data[0].seatNumbers)
        }
    })

    const bookTickets = async (ev) => {
        navigate('/payment',{state:{name:urlParams.theatername,date:urlParams.date,movie:urlParams.movie,seatNumbers:selectedSeats}})
    }
    
    const addSeat = async (ev) => {
        let x = parseInt(ev.target.getAttribute('data-key'))
        if(bookedSeats.includes(x)===false){
        if(selectedSeats.includes(x)){
            let arr = selectedSeats.filter(function(item) {
                return item !== x
            })
            setSelectedSeats(arr)
        }
        else{
            setSelectedSeats([...selectedSeats,x])
        }}
      };
    const [movie,setMovie] = useState('')
    var response = axios.get('https://ticket-booking-app-nodejs.herokuapp.com/user/theater',{
        headers:{
            'x-access-token':s
        }
    }).then(res => res.data).then(res => {
        for(let i=0;i<res.length;i++){
            if(urlParams.theatername==res[i].name){
                setMovie(res[i].movieRunning[urlParams.movie])
            }
        }
    })
    const dict = {
        0:'11:40 AM',
        1:'03:30 PM',
        2:'07:00 PM',
        3:'10:50 PM'
    }
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    return (
          <><div className="seating-details">
            <div><div className="sd">{urlParams.theatername}</div><div className="sd">{movie}</div><div className="sd">{dict[urlParams.movie]}</div></div>
          </div>
          <div className="seating-arrangement">
              <div className='sectionbook'>
          {normalSeats.map(seat => {
              const isSelected = selectedSeats.includes(numtoseat(seat));
              const isBooked = bookedSeats.includes(numtoseat(seat));
              let seatClass = 'book';
              if(isSelected) {
                  seatClass = 'disabledbook';
              }
              if(isBooked) {
                  seatClass = 'bookedbook';
              }
              return <div className={seatClass} onClick={addSeat} key={seat} data-key={numtoseat(seat)}>{seat}</div>;
          })}
      </div><br></br>
      </div> 
      <div className="booknow">
            <div className="paynow"><button onClick={(e) => bookTickets()}>Book seats</button></div></div>
            
          </>
  
      );  
}

const createSeats = (rows, startIndex) => {
    let i = 0;
    let j = startIndex;
    let k = 'A';
    const section = [];
    while(i < 6 && j <= rows) {
        if(k > 'J') {
            k = 'A';
            j++;
        }
        if(j < rows + 1) {
            section.push(j + k);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    return section;
}

const numtoseat = (seat) => {
    let arr = createSeats(10,'1')
    return arr.indexOf(seat)
}

export const seattonum = (num) => {
    let arr = createSeats(10,'1')
    return arr[num]
}