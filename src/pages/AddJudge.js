// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import "./AddJudge.css"

// function AddJudge(){

// const [name,setName] = useState("")
// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")

// const [events,setEvents] = useState([])
// const [selectedEvents,setSelectedEvents] = useState([])

// const [participants,setParticipants] = useState([])
// const [selectedParticipants,setSelectedParticipants] = useState([])

// const [assignParticipants,setAssignParticipants] = useState(false)

// const [judges,setJudges] = useState([])

// const [editingId,setEditingId] = useState(null)

// useEffect(()=>{

// fetchEvents()
// fetchJudges()
// fetchParticipants()

// },[])



// /* FETCH EVENTS */

// const fetchEvents = async()=>{

// const res = await axios.get(
// "http://localhost:5000/api/events/all"
// )

// setEvents(res.data)

// }



// /* FETCH PARTICIPANTS */

// const fetchParticipants = async()=>{

// const res = await axios.get(
// "http://localhost:5000/api/participants"
// )

// setParticipants(res.data)

// }



// /* FETCH JUDGES */

// const fetchJudges = async()=>{

// const res = await axios.get(
// "http://localhost:5000/api/judges"
// )

// setJudges(res.data)

// }



// /* EVENT SELECTION */

// const handleEventChange = (e)=>{

// const id = e.target.value

// if(selectedEvents.includes(id)){
// setSelectedEvents(selectedEvents.filter(x=>x!==id))
// }else{
// setSelectedEvents([...selectedEvents,id])
// }

// }



// /* PARTICIPANT SELECTION */

// const handleParticipantChange = (e)=>{

// const id = e.target.value

// if(selectedParticipants.includes(id)){
// setSelectedParticipants(selectedParticipants.filter(x=>x!==id))
// }else{
// setSelectedParticipants([...selectedParticipants,id])
// }

// }



// /* ADD OR UPDATE JUDGE */

// const addJudge = async()=>{

// try{

// if(editingId){

// await axios.put(
// `http://localhost:5000/api/judges/update/${editingId}`,
// {
// name,
// email,
// password,
// events:selectedEvents,
// assignedParticipants: assignParticipants ? selectedParticipants : []
// }
// )

// }else{

// await axios.post(
// "http://localhost:5000/api/judges/add",
// {
// name,
// email,
// password,
// events:selectedEvents,
// assignedParticipants: assignParticipants ? selectedParticipants : []
// }
// )

// }

// resetForm()

// fetchJudges()

// }catch(err){

// console.log(err)

// }

// }



// /* DELETE JUDGE */

// const deleteJudge = async(id)=>{

// await axios.delete(
// `http://localhost:5000/api/judges/delete/${id}`
// )

// fetchJudges()

// }



// /* EDIT JUDGE */

// const editJudge = (judge)=>{

// setEditingId(judge._id)

// setName(judge.name)
// setEmail(judge.email)
// setPassword(judge.password)

// setSelectedEvents(
// judge.assignedEvents.map(e=>e._id)
// )

// if(judge.assignedParticipants && judge.assignedParticipants.length>0){

// setAssignParticipants(true)

// setSelectedParticipants(
// judge.assignedParticipants.map(p=>p._id)
// )

// }

// }



// /* RESET FORM */

// const resetForm = ()=>{

// setEditingId(null)
// setName("")
// setEmail("")
// setPassword("")
// setSelectedEvents([])
// setSelectedParticipants([])
// setAssignParticipants(false)

// }



// return(

// <div className="page">

// <div className="card">

// <h2 className="title">

// {editingId ? "Edit Judge" : "Add Judge"}

// </h2>

// <div className="form-grid">

// <input
// className="input"
// placeholder="Judge Name"
// value={name}
// onChange={(e)=>setName(e.target.value)}
// />

// <input
// className="input"
// placeholder="Email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// className="input"
// placeholder="Password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// />

// </div>


// <h3 className="section-title">Select Events</h3>

// <div className="event-list">

// {events.map(event=>(

// <label key={event._id} className="event-item">

// <input
// type="checkbox"
// value={event._id}
// checked={selectedEvents.includes(event._id)}
// onChange={handleEventChange}
// />

// <span>{event.name}</span>

// </label>

// ))}

// </div>



// {/* PARTICIPANT ASSIGNMENT */}

// <div style={{marginTop:"20px"}}>

// <label>

// <input
// type="checkbox"
// checked={assignParticipants}
// onChange={()=>setAssignParticipants(!assignParticipants)}
// />

//  Assign Participants

// </label>

// </div>


// {assignParticipants && (

// <div className="event-list">

// {participants.map(p=>(

// <label key={p._id} className="event-item">

// <input
// type="checkbox"
// value={p._id}
// checked={selectedParticipants.includes(p._id)}
// onChange={handleParticipantChange}
// />

// <span>{p.participants}</span>

// </label>

// ))}

// </div>

// )}


// <button className="primary-btn" onClick={addJudge}>

// {editingId ? "Update Judge" : "Add Judge"}

// </button>

// </div>



// <div className="card">

// <h2 className="title">Existing Judges</h2>

// {judges.map(judge=>(

// <div key={judge._id} className="judge-card">

// <h3>{judge.name}</h3>

// <p className="email">{judge.email}</p>

// <div className="assigned-events">

// <b>Assigned Events:</b>

// {judge.assignedEvents.length>0 ?

// judge.assignedEvents.map((e,i)=>(
// <p key={i}>{e.name}</p>
// ))

// :

// <p>No events assigned</p>

// }

// </div>


// <div style={{display:"flex",gap:"10px"}}>

// <button
// className="primary-btn"
// onClick={()=>editJudge(judge)}
// >
// Edit
// </button>

// <button
// className="delete-btn"
// onClick={()=>deleteJudge(judge._id)}
// >
// Delete
// </button>

// </div>

// </div>

// ))}

// </div>

// </div>

// )

// }

// export default AddJudge

import React,{useEffect,useState} from "react"
import API from "../utils/axiosConfig"
import "./AddJudge.css"

function AddJudge(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const [events,setEvents] = useState([])
const [selectedEvents,setSelectedEvents] = useState([])

// const [participants,setParticipants] = useState([])
const [filteredParticipants,setFilteredParticipants] = useState([])

const [selectedParticipants,setSelectedParticipants] = useState([])

const [assignParticipants,setAssignParticipants] = useState(false)

const [judges,setJudges] = useState([])

const [editingId,setEditingId] = useState(null)

useEffect(()=>{

fetchEvents()
fetchJudges()

},[])


/* FETCH EVENTS */

const fetchEvents = async()=>{

const res = await API.get(
"/events/all"
)

setEvents(res.data)

}


/* FETCH JUDGES */

const fetchJudges = async()=>{

const res = await API.get(
"/judges"
)

setJudges(res.data)

}


/* FETCH PARTICIPANTS BASED ON EVENT */

const fetchParticipantsByEvent = async(eventId)=>{

const res = await API.get(
`/participants/event/${eventId}`
)

setFilteredParticipants(res.data)

}


/* EVENT SELECTION */

const handleEventChange = async(e)=>{

const id = e.target.value

let updatedEvents

if(selectedEvents.includes(id)){
updatedEvents = selectedEvents.filter(x=>x!==id)
}else{
updatedEvents = [...selectedEvents,id]
}

setSelectedEvents(updatedEvents)

/* reset participant selection */

setAssignParticipants(false)
setSelectedParticipants([])
setFilteredParticipants([])

/* load participants of first selected event */

if(updatedEvents.length > 0){
await fetchParticipantsByEvent(updatedEvents[0])
}

}


/* PARTICIPANT SELECTION */

const handleParticipantChange = (e)=>{

const id = e.target.value

if(selectedParticipants.includes(id)){
setSelectedParticipants(selectedParticipants.filter(x=>x!==id))
}else{
setSelectedParticipants([...selectedParticipants,id])
}

}


/* ADD OR UPDATE JUDGE */

const addJudge = async()=>{

try{

if(editingId){

await API.put(
`/judges/update/${editingId}`,
{
name,
email,
password,
events:selectedEvents,
assignedParticipants: assignParticipants ? selectedParticipants : []
}
)

}else{

await API.post(
"/judges/add",
{
name,
email,
password,
events:selectedEvents,
assignedParticipants: assignParticipants ? selectedParticipants : []
}
)

}

resetForm()
fetchJudges()

}catch(err){

console.log(err)

}

}


/* DELETE JUDGE */

const deleteJudge = async(id)=>{

await API.delete(
`/judges/delete/${id}`
)

fetchJudges()

}


/* EDIT JUDGE */

const editJudge = async(judge)=>{

setEditingId(judge._id)

setName(judge.name)
setEmail(judge.email)
setPassword(judge.password)

const eventIds = judge.assignedEvents.map(e=>e._id)

setSelectedEvents(eventIds)

if(eventIds.length > 0){
await fetchParticipantsByEvent(eventIds[0])
}

if(judge.assignedParticipants && judge.assignedParticipants.length>0){

setAssignParticipants(true)

setSelectedParticipants(
judge.assignedParticipants.map(p=>p._id)
)

}

}


/* RESET FORM */

const resetForm = ()=>{

setEditingId(null)
setName("")
setEmail("")
setPassword("")
setSelectedEvents([])
setSelectedParticipants([])
setAssignParticipants(false)
setFilteredParticipants([])

}



return(

<div className="page">

<div className="card">

<h2 className="title">
{editingId ? "Edit Judge" : "Add Judge"}
</h2>

<div className="form-grid">

<input
className="input"
placeholder="Judge Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="input"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="input"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

</div>


<h3 className="section-title">Select Events</h3>

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



{/* PARTICIPANT ASSIGNMENT */}

<div style={{marginTop:"20px"}}>

<label>

<input
type="checkbox"
checked={assignParticipants}
disabled={selectedEvents.length===0}
onChange={()=>setAssignParticipants(!assignParticipants)}
/>

 Assign Participants

</label>

</div>


{assignParticipants && (

<div className="event-list">

{filteredParticipants.map(p=>(

<label key={p._id} className="event-item">

<input
type="checkbox"
value={p._id}
checked={selectedParticipants.includes(p._id)}
onChange={handleParticipantChange}
/>

<span>{p.participants}</span>

</label>

))}

</div>

)}


<button className="primary-btn" onClick={addJudge}>

{editingId ? "Update Judge" : "Add Judge"}

</button>

</div>



<div className="card">

<h2 className="title">Existing Judges</h2>

{judges.map(judge=>(

<div key={judge._id} className="judge-card">

<h3>{judge.name}</h3>

<p className="email">{judge.email}</p>

<div className="assigned-events">

<b>Assigned Events:</b>

{judge.assignedEvents.length>0 ?

judge.assignedEvents.map((e,i)=>(
<p key={i}>{e.name}</p>
))

:

<p>No events assigned</p>

}

</div>


<div style={{display:"flex",gap:"10px"}}>

<button
className="primary-btn"
onClick={()=>editJudge(judge)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteJudge(judge._id)}
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

)

}

export default AddJudge