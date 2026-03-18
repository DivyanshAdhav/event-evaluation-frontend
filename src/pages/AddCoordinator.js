import React,{useState,useEffect} from "react"
import API from "../utils/axiosConfig"
import "./AddCoordinator.css"

function AddCoordinator(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const [events,setEvents] = useState([])
const [selectedEvents,setSelectedEvents] = useState([])

const [coordinators,setCoordinators] = useState([])

useEffect(()=>{
fetchEvents()
fetchCoordinators()
},[])

const fetchEvents = async()=>{

const res = await API.get(
"/events/all"
)

setEvents(res.data)

}

const fetchCoordinators = async()=>{

const res = await API.get(
"/coordinators"
)

setCoordinators(res.data)

}

const handleEventChange = (e)=>{

const id = e.target.value

if(selectedEvents.includes(id)){
setSelectedEvents(selectedEvents.filter(i=>i!==id))
}else{
setSelectedEvents([...selectedEvents,id])
}

}

const addCoordinator = async()=>{

await API.post(
"/coordinators/add",
{
name,
email,
password,
events:selectedEvents
}
)

setName("")
setEmail("")
setPassword("")
setSelectedEvents([])

fetchCoordinators()

}

return(

<div className="add-coordinator-page">

<div className="add-coordinator-container">

<h2 className="title">Add Coordinator</h2>

<div className="form-grid">

<input
className="input"
placeholder="Coordinator Name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
className="input"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<input
className="input"
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

</div>

<h3 className="section-title">Assign Events</h3>

<div className="event-list">

{events.map(event=>(

<label key={event._id} className="event-item">

<input
type="checkbox"
value={event._id}
checked={selectedEvents.includes(event._id)}
onChange={handleEventChange}
/>

<span>{event.name}</span>

</label>

))}

</div>

<button className="primary-btn" onClick={addCoordinator}>
Add Coordinator
</button>

</div>

<div className="existing-container">

<h2 className="title">Existing Coordinators</h2>

{coordinators.map(c=>(

<div key={c._id} className="coordinator-card">

<h3>{c.name}</h3>

<p>{c.email}</p>

<div className="assigned-events">

<b>Assigned Events:</b>

{c.assignedEvents.map(e=>(
<p key={e._id}>{e.name}</p>
))}

</div>

</div>

))}

</div>

</div>

)

}

export default AddCoordinator