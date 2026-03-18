// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import {useNavigate} from "react-router-dom"
// import "./CoordinatorDashboard.css"

// function CoordinatorDashboard(){

// const [events,setEvents] = useState([])
// const navigate = useNavigate()

// useEffect(()=>{
// fetchEvents()
// },[])

// const fetchEvents = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const res = await axios.get(
// `http://localhost:5000/api/events/judge/${user.id}`
// )

// setEvents(res.data)

// }catch(err){
// console.log(err)
// }

// }

// const logout = ()=>{
// localStorage.removeItem("user")
// navigate("/")
// }

// return(

// <div className="coordinator-page">

// <div className="coordinator-container">

// <div className="dashboard-header">

// <h1 className="dashboard-title">
// Coordinator Dashboard
// </h1>

// <button className="logout-btn" onClick={logout}>
// Logout
// </button>

// </div>

// <p className="dashboard-subtitle">
// Manage Reports & Results for Your Assigned Events
// </p>

// <div className="event-grid">

// {events.length===0 && (
// <p className="no-events">No events assigned</p>
// )}

// {events.map(event=>(

// <div key={event._id} className="event-card">

// <h3>{event.name}</h3>

// <div className="card-buttons">

// <button
// className="report-btn"
// onClick={()=>navigate(`/judge-report/${event._id}`)}
// >
// Judge Report
// </button>

// <button
// className="leaderboard-btn"
// onClick={()=>navigate(`/leaderboard/${event._id}`)}
// >
// Leaderboard
// </button>

// </div>

// </div>

// ))}

// </div>

// </div>

// </div>

// )

// }

// export default CoordinatorDashboard

// import React from "react"
// import {useNavigate} from "react-router-dom"
// import "./CoordinatorDashboard.css"

// function CoordinatorDashboard(){

// const navigate = useNavigate()

// const logout = ()=>{
// localStorage.removeItem("user")
// navigate("/")
// }

// return(

// <div className="coordinator-page">

// <div className="dashboard-container">

// <div className="dashboard-header">

// <h1>Coordinator Dashboard</h1>

// <button className="logout-btn" onClick={logout}>
// Logout
// </button>

// </div>

// <div className="dashboard-grid">

// <div className="dashboard-card">

// <h2>Judge Reports</h2>

// <p>
// View marks given by judges and export reports in PDF or Excel.
// </p>

// <button
// className="dashboard-btn"
// onClick={()=>navigate("/judge-report")}
// >
// Open Judge Report
// </button>

// </div>

// <div className="dashboard-card">

// <h2>Leaderboard</h2>

// <p>
// View rankings of participants based on evaluation marks.
// </p>

// <button
// className="dashboard-btn"
// onClick={()=>navigate("/leaderboard")}
// >
// Open Leaderboard
// </button>

// </div>

// </div>

// </div>

// </div>

// )

// }

// export default CoordinatorDashboard

import React,{useEffect,useState} from "react"
import API from "../utils/axiosConfig"
import {useNavigate} from "react-router-dom"
import "./CoordinatorDashboard.css"

function CoordinatorDashboard(){

const [event,setEvent] = useState(null)
const navigate = useNavigate()

useEffect(()=>{
loadEvent()
},[])

const loadEvent = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"))

const res = await API.get(
`/events/judge/${user.id}`
)

if(res.data.length>0){
setEvent(res.data[0])
}

}catch(err){
console.log(err)
}

}

const logout = ()=>{
localStorage.removeItem("user")
navigate("/")
}

if(!event){
return <h3 style={{textAlign:"center"}}>Loading...</h3>
}

return(

<div className="coordinator-page">

<div className="coordinator-container">

<div className="header">

<h2>Coordinator Dashboard</h2>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

<h3 className="event-title">
Event : {event.name}
</h3>

<div className="dashboard-grid">

<div className="dashboard-card">

<h3>Judge Report</h3>

<button
className="dashboard-btn"
onClick={()=>navigate(`/judge-report?event=${event._id}`)}
>
Open Judge Report
</button>

</div>

<div className="dashboard-card">

<h3>Leaderboard</h3>

<button
className="dashboard-btn"
onClick={()=>navigate(`/leaderboard?event=${event._id}`)}
>
Open Leaderboard
</button>

</div>

</div>

</div>

</div>

)

}

export default CoordinatorDashboard