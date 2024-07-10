import React,{useState} from "react";
import './signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage(){
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [admin,setAdmin]=useState(false)
    const navigate = useNavigate()
    const handleChange = async (e,fun) => {
        fun(e.target.value)
    }
    const toggle = async (e) => {
        setAdmin(!admin)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(admin==true){
            if(firstName!=='' && lastName!=='' && email!=='' && password!==''){
                var response = axios.post('https://ticket-booking-app-nodejs.herokuapp.com/admin/register',{
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password
                }).then(res => {
                    document.cookie = "token="+res.data.token
                    navigate('/dashboard');
                }).catch((err) => {
                    console.log("invalid credentials")
                    window.alert("Please enter correct credentials")
                })
            }
            else{
                window.alert('Email and password is required')
            }
        }else{
            if(firstName!=='' && lastName!=='' && email!=='' && password!==''){
                var response = axios.post('https://ticket-booking-app-nodejs.herokuapp.com/user/register',{
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password
                }).then(res => {
                    console.log(res)
                    document.cookie = "token="+res.data.token
                    navigate('/dashboard');
                }).catch((err) => {
                    console.log("invalid credentials")
                    window.alert("Please enter correct credentials")
                })
            }
            else{
                window.alert('Email and password is required')
            }
        }
        
        
    }
    return(<>
        <div className="title-signup">Ticket Booker</div>
        <div className="back">
            <div className="form">
                <div>
                    <form className="innerform" onSubmit={handleSubmit}>
                        <div className="details">
                            <label class="switch">
                                <input type="checkbox" value={true} onChange={(e) => toggle(e)}></input>
                                    <span class="slider round"></span>
                            </label>
                            Admin
                            <br></br>
                            <input placeholder="First Name" type="text" onChange={(e)=>handleChange(e,setFirstName)}></input><br></br>
                            <input placeholder="Last Name" type="text" onChange={(e)=>handleChange(e,setLastName)}></input><br></br>
                            <input placeholder="Email" type="email" onChange={(e)=>handleChange(e,setEmail)}></input><br></br>
                            <input placeholder="Password" type="password" onChange={(e)=>handleChange(e,setPassword)}></input><br></br>
                            <div className="buttons">
                            <button className="button" onClick={(e)=>{navigate('/login')}}>Login</button><button type="submit" className="button">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}