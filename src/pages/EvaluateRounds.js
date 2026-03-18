// import React,{useEffect,useState} from "react"
// import API from "../utils/axiosConfig"
// import {useParams,useNavigate} from "react-router-dom"

// function EvaluateRounds(){

// const {participantId} = useParams()
// const navigate = useNavigate()

// const [event,setEvent] = useState(null)

// useEffect(()=>{
// loadEvent()
// },[])

// const loadEvent = async()=>{

// const participantRes = await API.get(
// `/participants/${participantId}`
// )

// const eventId = participantRes.data.event

// const eventRes = await API.get(
// `/events/${eventId}`
// )

// setEvent(eventRes.data)

// }

// if(!event) return <h3>Loading...</h3>

// return(

// <div style={{padding:"20px"}}>

// <h2>{event.name} Rounds</h2>

// <div style={{display:"flex",gap:"20px"}}>

// {event.rounds.map(round=>(

// <button
// key={round.name}
// onClick={()=>navigate(`/evaluate/${participantId}/${round.name}`)}
// style={{
// padding:"10px 20px",
// fontSize:"16px",
// cursor:"pointer"
// }}
// >

// Evaluate {round.name}

// </button>

// ))}

// </div>

// </div>

// )

// }

// export default EvaluateRounds





import React,{useEffect,useState,useCallback} from "react"
import API from "../utils/axiosConfig"
import {useParams,useNavigate} from "react-router-dom"

function EvaluateRounds(){

const {participantId} = useParams()
const navigate = useNavigate()

const [event,setEvent] = useState(null)

/* FIXED */
const loadEvent = useCallback(async()=>{

try{

const participantRes = await API.get(`/participants/${participantId}`)
const eventId = participantRes.data.event

const eventRes = await API.get(`/events/${eventId}`)
setEvent(eventRes.data)

}catch(err){
console.log(err)
}

},[participantId])

useEffect(()=>{
loadEvent()
},[loadEvent])

if(!event) return <h3>Loading...</h3>

return(
<div style={{padding:"20px"}}>
<h2>{event.name} Rounds</h2>

{event.rounds.map(round=>(
<button
key={round.name}
onClick={()=>navigate(`/evaluate/${participantId}/${round.name}`)}
>
Evaluate {round.name}
</button>
))}
</div>
)

}

export default EvaluateRounds