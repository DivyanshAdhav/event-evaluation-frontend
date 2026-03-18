// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import "./CreateEvent.css"

// function CreateEvent(){

// const [eventName,setEventName] = useState("")
// const [criteriaName,setCriteriaName] = useState("")
// const [maxMarks,setMaxMarks] = useState("")

// const [criteriaList,setCriteriaList] = useState([])

// const [events,setEvents] = useState([])

// /* NEW STATES FOR ROUNDS */

// const [roundBased,setRoundBased] = useState(false)
// const [rounds,setRounds] = useState(1)


// useEffect(()=>{
// fetchEvents()
// },[])


// const fetchEvents = async()=>{

// const res = await axios.get("http://localhost:5000/api/events/all")

// setEvents(res.data)

// }


// /* ADD CRITERIA */

// const addCriteria = ()=>{

// if(criteriaName==="" || maxMarks==="") return

// setCriteriaList([
// ...criteriaList,
// {
// name:criteriaName,
// maxMarks:maxMarks
// }
// ])

// setCriteriaName("")
// setMaxMarks("")

// }


// /* CREATE EVENT */

// const createEvent = async()=>{

// if(eventName==="") return

// await axios.post(
// "http://localhost:5000/api/events/create",
// {
// name:eventName,
// criteria:criteriaList,
// roundBased:roundBased,
// rounds:roundBased ? rounds : 1
// }
// )

// setEventName("")
// setCriteriaList([])
// setRoundBased(false)
// setRounds(1)

// fetchEvents()

// }


// /* DELETE EVENT */

// const deleteEvent = async(id)=>{

// await axios.delete(
// `http://localhost:5000/api/events/delete/${id}`
// )

// fetchEvents()

// }



// return(

// <div className="page">

// <div className="card">

// <h2 className="title">Create Event</h2>

// <input
// className="input"
// placeholder="Event Name"
// value={eventName}
// onChange={(e)=>setEventName(e.target.value)}
// />


// {/* NEW ROUND OPTION */}

// <div style={{marginTop:"10px"}}>

// <label>

// <input
// type="checkbox"
// checked={roundBased}
// onChange={(e)=>setRoundBased(e.target.checked)}
// />

// Evaluation in Rounds

// </label>

// </div>


// {roundBased && (

// <input
// className="input"
// style={{marginTop:"10px"}}
// type="number"
// min="1"
// placeholder="Number of Rounds"
// value={rounds}
// onChange={(e)=>setRounds(e.target.value)}
// />

// )}



// <h3 className="section-title">Judging Criteria</h3>

// <div className="criteria-row">

// <input
// className="input"
// placeholder="Criteria Name"
// value={criteriaName}
// onChange={(e)=>setCriteriaName(e.target.value)}
// />

// <input
// className="input"
// placeholder="Max Marks"
// value={maxMarks}
// onChange={(e)=>setMaxMarks(e.target.value)}
// />

// <button className="secondary-btn" onClick={addCriteria}>
// Add
// </button>

// </div>


// <div className="criteria-list">

// {criteriaList.map((c,i)=>(

// <div key={i} className="criteria-item">
// {c.name} — {c.maxMarks}
// </div>

// ))}

// </div>


// <button className="primary-btn" onClick={createEvent}>
// Create Event
// </button>

// </div>



// <div className="card">

// <h2 className="title">Created Events</h2>

// {events.map((event)=>(

// <div key={event._id} className="event-card">

// <h3>{event.name}</h3>

// {/* SHOW ROUND INFO */}

// {event.roundBased && (

// <p>Rounds: {event.rounds}</p>

// )}

// <div className="criteria-list">

// {event.criteria.map((c,i)=>(

// <div key={i} className="criteria-item">
// {c.name} — {c.maxMarks}
// </div>

// ))}

// </div>

// <button
// className="delete-btn"
// onClick={()=>deleteEvent(event._id)}
// >
// Delete
// </button>

// </div>

// ))}

// </div>

// </div>

// )

// }

// export default CreateEvent

import React,{useState,useEffect} from "react"
import API from "../utils/axiosConfig"
import "./CreateEvent.css"

function CreateEvent(){

const [eventName,setEventName] = useState("")
const [criteriaName,setCriteriaName] = useState("")
const [maxMarks,setMaxMarks] = useState("")

const [criteriaList,setCriteriaList] = useState([])

const [roundBased,setRoundBased] = useState(false)
const [rounds,setRounds] = useState(1)

const [events,setEvents] = useState([])

const [editingId,setEditingId] = useState(null)

useEffect(()=>{
fetchEvents()
},[])



const fetchEvents = async()=>{

const res = await API.get(
"/events/all"
)

setEvents(res.data)

}



/* ADD CRITERIA */

const addCriteria = ()=>{

if(criteriaName==="" || maxMarks==="") return

setCriteriaList([

...criteriaList,

{
name:criteriaName,
maxMarks:maxMarks
}

])

setCriteriaName("")
setMaxMarks("")

}



/* CREATE OR UPDATE EVENT */

const createEvent = async()=>{

if(editingId){

await API.put(
`/events/update/${editingId}`,
{
name:eventName,
criteria:criteriaList,
roundBased,
rounds
}
)

}else{

await API.post(
"/events/create",
{
name:eventName,
criteria:criteriaList,
roundBased,
rounds
}
)

}

resetForm()
fetchEvents()

}



/* DELETE EVENT */

const deleteEvent = async(id)=>{

await API.delete(
`/events/delete/${id}`
)

fetchEvents()

}



/* EDIT EVENT */

const editEvent = (event)=>{

setEditingId(event._id)
setEventName(event.name)
setCriteriaList(event.criteria)

setRoundBased(event.roundBased)
setRounds(event.rounds)

}



/* RESET FORM */

const resetForm = ()=>{

setEditingId(null)
setEventName("")
setCriteriaList([])
setRoundBased(false)
setRounds(1)

}



return(

<div className="page">

<div className="card">

<h2 className="title">

{editingId ? "Edit Event" : "Create Event"}

</h2>

<input
className="input"
placeholder="Event Name"
value={eventName}
onChange={(e)=>setEventName(e.target.value)}
/>



<h3 className="section-title">Judging Criteria</h3>

<div className="criteria-row">

<input
className="input"
placeholder="Criteria Name"
value={criteriaName}
onChange={(e)=>setCriteriaName(e.target.value)}
/>

<input
className="input"
placeholder="Max Marks"
value={maxMarks}
onChange={(e)=>setMaxMarks(e.target.value)}
/>

<button className="secondary-btn" onClick={addCriteria}>
Add
</button>

</div>


<div className="criteria-list">

{criteriaList.map((c,i)=>(

<div key={i} className="criteria-item">
{c.name} — {c.maxMarks}
</div>

))}

</div>


{/* ROUND SYSTEM */}

<div style={{marginTop:"15px"}}>

<label>

<input
type="checkbox"
checked={roundBased}
onChange={()=>setRoundBased(!roundBased)}
/>

 Round Based Event

</label>

</div>


{roundBased && (

<input
className="input"
placeholder="Number of Rounds"
value={rounds}
onChange={(e)=>setRounds(e.target.value)}
/>

)}


<button className="primary-btn" onClick={createEvent}>

{editingId ? "Update Event" : "Create Event"}

</button>

</div>



<div className="card">

<h2 className="title">Existing Events</h2>

{events.map(event=>(

<div key={event._id} className="event-card">

<h3>{event.name}</h3>

<div className="criteria-list">

{event.criteria.map((c,i)=>(

<div key={i} className="criteria-item">
{c.name} — {c.maxMarks}
</div>

))}

</div>


<div style={{display:"flex",gap:"10px"}}>

<button
className="primary-btn"
onClick={()=>editEvent(event)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteEvent(event._id)}
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

export default CreateEvent