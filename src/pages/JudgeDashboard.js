// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import {useNavigate} from "react-router-dom"
// import "./JudgeDashboard.css"

// function JudgeDashboard(){

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

// /* Logout */

// const logout = ()=>{

// localStorage.removeItem("user")

// navigate("/")

// }

// return(

// <div className="judge-page">

// <div className="judge-header">

// <h2 className="title">Judge Dashboard</h2>

// <button
// className="logout-btn"
// onClick={logout}
// >
// Logout
// </button>

// </div>

// <div className="event-container">

// {events.length === 0 && (
// <p className="no-events">No events assigned</p>
// )}

// {events.map(event=>(

// <div key={event._id} className="event-card">

// <h3>{event.name}</h3>

// <button
// className="open-btn"
// onClick={()=>navigate(`/judge/event/${event._id}`)}
// >
// Open Event
// </button>

// </div>

// ))}

// </div>

// </div>

// )

// }

// export default JudgeDashboard

import React,{useEffect,useState} from "react"
import API from "../utils/axiosConfig"
import {useNavigate} from "react-router-dom"
import "./JudgeDashboard.css"

function JudgeDashboard(){

const [events,setEvents] = useState([])
const navigate = useNavigate()

useEffect(()=>{
fetchEvents()
},[])

const fetchEvents = async()=>{

try{

const judgeId = localStorage.getItem("judgeId")

if(!judgeId){
console.log("Judge ID not found")
return
}

const res = await API.get(
`/events/judge/${judgeId}`
)

setEvents(res.data)

}catch(err){

console.log("Error fetching events",err)

}

}

const handleLogout = ()=>{

localStorage.clear()
navigate("/")

}

return(

<div className="judge-dashboard-page">

<div className="judge-dashboard">

<div className="dashboard-header">

<h2 className="dashboard-title">Judge Dashboard</h2>

<button
className="logout-btn"
onClick={handleLogout}
>
Logout
</button>

</div>


{events.length===0 ?(

<p className="no-events">No events assigned</p>

):(

<div className="event-grid">

{events.map(event=>(

<div key={event._id} className="event-card">

<h3>{event.name}</h3>

<button
className="open-btn"
onClick={()=>navigate(`/judge/event/${event._id}`)}
>
Evaluate
</button>

</div>

))}

</div>

)}

</div>

</div>

)

}

export default JudgeDashboard