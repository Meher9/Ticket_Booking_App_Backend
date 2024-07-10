import React,{useState} from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
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
            if(email!='' && password!=''){
                var response = axios.post('https://ticket-booking-app-nodejs.herokuapp.com/admin/login',{
                    email:email,
                    password:password
                }).then(res => {
                    document.cookie = "token="+res.data.token
                    navigate('/dashboard')
                }).catch((err) => {
                    console.log("invalid credentials")
                    window.alert("Please enter correct credentials")
                })
            }
            else{
                window.alert('Email and password is required')
            }
        }else{
            if(email!='' && password!=''){
                var response = axios.post('https://ticket-booking-app-nodejs.herokuapp.com/user/login',{
                    email:email,
                    password:password
                }).then(res => {
                    document.cookie = "token="+res.data.token
                    navigate('/dashboard')
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
    return (<>
        <div className="title-login">Ticket Booker</div>
        <div className="back">
            <div className="forml">
                <div>
                    <form className="innerforml" onSubmit={handleSubmit}>
                        <div className="details">
                            <label class="switch">
                                <input type="checkbox" value={true} onChange={(e) => toggle(e)}></input>
                                    <span class="slider round"></span>
                            </label>
                            Admin
                            <br></br>
                            <input placeholder="Email" type="email" value={email} onChange={(e) => handleChange(e,setEmail)}></input><br></br>
                            <input placeholder="Password" type="password" value={password} onChange={(e) => handleChange(e,setPassword)}></input><br></br>
                            <div className="buttons">
                            <button className="button" onClick={(e) => {navigate('/signup')}}>New User</button><button type="submit" className="button">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}