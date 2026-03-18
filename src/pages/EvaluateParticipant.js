// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import {useParams} from "react-router-dom"

// function EvaluateParticipant(){

// const {participantId} = useParams()

// const [event,setEvent] = useState(null)
// const [scores,setScores] = useState([])
// const [editing,setEditing] = useState(false)



// useEffect(()=>{
// loadData()
// },[])



// const loadData = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const participantRes = await axios.get(
// `http://localhost:5000/api/participants/${participantId}`
// )

// const eventId = participantRes.data.event



// const eventRes = await axios.get(
// `http://localhost:5000/api/events/${eventId}`
// )

// setEvent(eventRes.data)



// /* Default scores */

// let defaultScores = eventRes.data.criteria.map(c=>({
// criteria:c.name,
// marks:0,
// max:c.maxMarks
// }))



// /* Check if evaluation already exists */

// const evalRes = await axios.get(
// `http://localhost:5000/api/evaluation/${participantId}/${user.id}/${eventId}`
// )



// if(evalRes.data){

// setEditing(true)

// defaultScores = defaultScores.map(c=>{

// const existing = evalRes.data.scores.find(
// s=>s.criteria === c.criteria
// )

// return {
// ...c,
// marks:existing ? existing.marks : 0
// }

// })

// }



// setScores(defaultScores)

// }catch(err){

// console.log(err)

// }

// }



// const handleChange = (index,value)=>{

// const updated = [...scores]

// if(Number(value) > updated[index].max){

// alert(`Marks cannot exceed ${updated[index].max}`)

// return

// }

// updated[index].marks = value

// setScores(updated)

// }



// const submitMarks = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const formattedScores = scores.map(s=>({
// criteria:s.criteria,
// marks:Number(s.marks)
// }))

// await axios.post(
// "http://localhost:5000/api/evaluation/submit",
// {
// participant:participantId,
// judge:user.id,
// event:event._id,
// scores:formattedScores
// }
// )

// alert(editing ? "Marks Updated" : "Marks Submitted")

// }catch(err){

// alert("Error submitting marks")

// }

// }



// if(!event) return <h3>Loading...</h3>



// return(

// <div style={{padding:"20px"}}>

// <h2>{event.name} Evaluation</h2>



// {scores.map((c,index)=>(

// <div key={index} style={{marginBottom:"15px"}}>

// <label>
// {c.criteria} (Max {c.max})
// </label>

// <br/>

// <input
// type="number"
// value={c.marks}
// onChange={(e)=>handleChange(index,e.target.value)}
// />

// </div>

// ))}



// <button onClick={submitMarks}>

// {editing ? "Update Marks" : "Submit Marks"}

// </button>



// </div>

// )

// }

// export default EvaluateParticipant

// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import {useParams} from "react-router-dom"
// import "./EvaluateParticipant.css"

// function EvaluateParticipant(){

// const {participantId} = useParams()

// const [event,setEvent] = useState(null)
// const [scores,setScores] = useState([])
// const [editing,setEditing] = useState(false)

// useEffect(()=>{
// loadData()
// },[])

// const loadData = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const participantRes = await axios.get(
// `http://localhost:5000/api/participants/${participantId}`
// )

// const eventId = participantRes.data.event

// const eventRes = await axios.get(
// `http://localhost:5000/api/events/${eventId}`
// )

// setEvent(eventRes.data)

// /* Default scores */

// let defaultScores = eventRes.data.criteria.map(c=>({
// criteria:c.name,
// marks:0,
// max:c.maxMarks
// }))

// /* Check if evaluation already exists */

// const evalRes = await axios.get(
// `http://localhost:5000/api/evaluation/${participantId}/${user.id}/${eventId}`
// )

// if(evalRes.data){

// setEditing(true)

// defaultScores = defaultScores.map(c=>{

// const existing = evalRes.data.scores.find(
// s=>s.criteria === c.criteria
// )

// return {
// ...c,
// marks:existing ? existing.marks : 0
// }

// })

// }

// setScores(defaultScores)

// }catch(err){

// console.log(err)

// }

// }

// const handleChange = (index,value)=>{

// const updated = [...scores]

// if(Number(value) > updated[index].max){

// alert(`Marks cannot exceed ${updated[index].max}`)

// return

// }

// updated[index].marks = value

// setScores(updated)

// }

// const submitMarks = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const formattedScores = scores.map(s=>({
// criteria:s.criteria,
// marks:Number(s.marks)
// }))

// await axios.post(
// "http://localhost:5000/api/evaluation/submit",
// {
// participant:participantId,
// judge:user.id,
// event:event._id,
// scores:formattedScores
// }
// )

// alert(editing ? "Marks Updated" : "Marks Submitted")

// }catch(err){

// alert("Error submitting marks")

// }

// }

// if(!event) return <h3>Loading...</h3>

// return(

// <div className="evaluation-page">

// <div className="evaluation-card">

// <h2 className="title">{event.name} Evaluation</h2>

// <div className="criteria-list">

// {scores.map((c,index)=>(

// <div key={index} className="criteria-item">

// <div className="criteria-label">

// <div className="criteria-name">
// {c.criteria}
// </div>

// <div className="max">
// Max Marks: {c.max}
// </div>

// </div>

// <input
// className="marks-input"
// type="number"
// value={c.marks}
// onChange={(e)=>handleChange(index,e.target.value)}
// />

// </div>

// ))}

// </div>

// <button
// className="submit-btn"
// onClick={submitMarks}
// >

// {editing ? "Update Marks" : "Submit Marks"}

// </button>

// </div>

// </div>

// )

// }

// export default EvaluateParticipant

// import React,{useEffect,useState} from "react"
// import axios from "axios"
// import {useParams} from "react-router-dom"
// import "./EvaluateParticipant.css"

// function EvaluateParticipant(){

// const {participantId} = useParams()

// const [event,setEvent] = useState(null)
// const [scores,setScores] = useState([])
// const [editing,setEditing] = useState(false)

// useEffect(()=>{
// loadData()
// },[])

// const loadData = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// /* Get participant */

// const participantRes = await axios.get(
// `http://localhost:5000/api/participants/${participantId}`
// )

// const eventId = participantRes.data.event

// /* Get event */

// const eventRes = await axios.get(
// `http://localhost:5000/api/events/${eventId}`
// )

// setEvent(eventRes.data)

// /* Default scores */

// let defaultScores = eventRes.data.criteria.map(c=>({
// criteria:c.name,
// marks:0,
// max:c.maxMarks
// }))

// /* Check existing evaluation */

// const evalRes = await axios.get(
// `http://localhost:5000/api/evaluation/${eventId}/${participantId}/${user.id}`
// )

// /* If evaluation document exists */

// if(evalRes.data && evalRes.data._id){

// setEditing(true)

// const existingScores = evalRes.data.scores || []

// defaultScores = defaultScores.map(c=>{

// const existing = existingScores.find(
// s=>s.criteria === c.criteria
// )

// return {
// ...c,
// marks: existing ? existing.marks : 0
// }

// })

// }

// setScores(defaultScores)

// }catch(err){

// console.log(err)

// }

// }

// const handleChange = (index,value)=>{

// const updated = [...scores]

// if(Number(value) > updated[index].max){

// alert(`Marks cannot exceed ${updated[index].max}`)

// return

// }

// updated[index].marks = value

// setScores(updated)

// }

// const submitMarks = async()=>{

// try{

// const user = JSON.parse(localStorage.getItem("user"))

// const formattedScores = scores.map(s=>({
// criteria:s.criteria,
// marks:Number(s.marks)
// }))

// await axios.post(
// "http://localhost:5000/api/evaluation/submit",
// {
// participant:participantId,
// judge:user.id,
// event:event._id,
// scores:formattedScores
// }
// )

// /* Change button immediately */

// setEditing(true)

// alert(editing ? "Marks Updated" : "Marks Submitted")

// }catch(err){

// alert("Error submitting marks")

// }

// }

// if(!event) return <h3>Loading...</h3>

// return(

// <div className="evaluation-page">

// <div className="evaluation-card">

// <h2 className="title">{event.name} Evaluation</h2>

// <div className="criteria-list">

// {scores.map((c,index)=>(

// <div key={index} className="criteria-item">

// <div className="criteria-label">

// <div className="criteria-name">
// {c.criteria}
// </div>

// <div className="max">
// Max Marks: {c.max}
// </div>

// </div>

// <input
// className="marks-input"
// type="number"
// value={c.marks}
// onChange={(e)=>handleChange(index,e.target.value)}
// />

// </div>

// ))}

// </div>

// <button
// className="submit-btn"
// onClick={submitMarks}
// >

// {editing ? "Update Marks" : "Submit Marks"}

// </button>

// </div>

// </div>

// )

// }

// export default EvaluateParticipant

// import React,{useEffect,useState} from "react"
// import API from "../utils/axiosConfig"
// import {useParams} from "react-router-dom"
// import "./EvaluateParticipant.css"

// function EvaluateParticipant(){

// const {participantId} = useParams()

// const [event,setEvent] = useState(null)
// const [roundList,setRoundList] = useState([])
// const [selectedRound,setSelectedRound] = useState(null)

// const [scores,setScores] = useState([])
// const [editing,setEditing] = useState(false)

// useEffect(()=>{
// loadData()
// },[])

// const loadData = async()=>{

// const participantRes = await API.get(
// `/participants/${participantId}`
// )

// const eventId = participantRes.data.event

// const eventRes = await API.get(
// `/events/${eventId}`
// )

// setEvent(eventRes.data)

// let rounds=[]

// if(eventRes.data.roundBased){

// for(let i=1;i<=eventRes.data.rounds;i++){
// rounds.push(`Round ${i}`)
// }

// }else{

// rounds=["Main"]

// }

// setRoundList(rounds)

// }

// /* OPEN ROUND */

// const openRound = async(roundName)=>{

// setSelectedRound(roundName)

// const user = JSON.parse(localStorage.getItem("user"))
// const judgeId = user.id || user._id

// let defaultScores = event.criteria.map(c=>({

// round:event.roundBased ? roundName : null,
// criteria:c.name,
// marks:0,
// max:c.maxMarks

// }))

// try{

// const evalRes = await API.get(
// `/evaluation/${event._id}/${participantId}/${judgeId}`
// )

// if(evalRes.data){

// const existingScores = evalRes.data.scores || []

// const roundScores = existingScores.filter(
// s => (s.round || null) === (event.roundBased ? roundName : null)
// )

// if(roundScores.length>0){

// setEditing(true)

// defaultScores = defaultScores.map(c=>{

// const existing = roundScores.find(
// s => s.criteria === c.criteria
// )

// return{
// ...c,
// marks:existing ? existing.marks : 0
// }

// })

// }else{

// setEditing(false)

// }

// }

// }catch(err){

// setEditing(false)

// }

// setScores(defaultScores)

// }

// /* CHANGE MARKS */

// const handleChange = (index,value)=>{

// const updated=[...scores]

// if(Number(value)>updated[index].max){

// alert(`Marks cannot exceed ${updated[index].max}`)
// return

// }

// updated[index].marks=value
// setScores(updated)

// }

// /* SUBMIT */

// const submitMarks = async()=>{

// const user = JSON.parse(localStorage.getItem("user"))
// const judgeId = user.id || user._id

// await API.post(
// "/evaluation/submit",
// {
// participant:participantId,
// judge:judgeId,
// event:event._id,
// scores:scores
// }
// )

// setEditing(true)

// alert(editing ? "Marks Updated" : "Marks Submitted")

// }

// if(!event) return <h3>Loading...</h3>

// return(

// <div className="evaluation-page">

// <div className="evaluation-card">

// <h2 className="title">{event.name} Evaluation</h2>

// {/* ROUND LIST */}

// {!selectedRound && (

// <div className="round-list">

// {roundList.map(round=>(

// <div key={round} className="round-row">

// <span className="round-name">{round}</span>

// <button
// className="evaluate-btn"
// onClick={()=>openRound(round)}
// >
// Evaluate
// </button>

// </div>

// ))}

// </div>

// )}

// {/* CRITERIA */}

// {selectedRound && (

// <div>

// <h3>{selectedRound}</h3>

// <div className="criteria-list">

// {scores.map((c,index)=>(

// <div key={index} className="criteria-item">

// <div>

// <b>{c.criteria}</b>
// <p>Max Marks: {c.max}</p>

// </div>

// <input
// type="number"
// value={c.marks}
// onChange={(e)=>handleChange(index,e.target.value)}
// />

// </div>

// ))}

// </div>

// <button
// className="submit-btn"
// onClick={submitMarks}
// >

// {editing ? "Update Marks" : "Submit Marks"}

// </button>

// </div>

// )}

// </div>

// </div>

// )

// }

// export default EvaluateParticipant





// import React,{useEffect,useState,useCallback} from "react"
// import API from "../utils/axiosConfig"
// import {useParams} from "react-router-dom"
// import "./EvaluateParticipant.css"

// function EvaluateParticipant(){

// const {participantId} = useParams()

// const [event,setEvent] = useState(null)
// const [roundList,setRoundList] = useState([])
// const [selectedRound,setSelectedRound] = useState(null)
// const [scores,setScores] = useState([])
// const [editing,setEditing] = useState(false)

// /* FIXED */
// const loadData = useCallback(async()=>{

// try{

// const participantRes = await API.get(`/participants/${participantId}`)
// const eventId = participantRes.data.event

// const eventRes = await API.get(`/events/${eventId}`)
// setEvent(eventRes.data)

// let rounds=[]

// if(eventRes.data.roundBased){
// for(let i=1;i<=eventRes.data.rounds;i++){
// rounds.push(`Round ${i}`)
// }
// }else{
// rounds=["Main"]
// }

// setRoundList(rounds)

// }catch(err){
// console.log(err)
// }

// },[participantId])

// useEffect(()=>{
// loadData()
// },[loadData])

// /* OPEN ROUND */
// const openRound = async(roundName)=>{

// setSelectedRound(roundName)

// const user = JSON.parse(localStorage.getItem("user"))
// const judgeId = user.id || user._id

// let defaultScores = event.criteria.map(c=>({
// round:event.roundBased ? roundName : null,
// criteria:c.name,
// marks:0,
// max:c.maxMarks
// }))

// try{

// const evalRes = await API.get(
// `/evaluation/${event._id}/${participantId}/${judgeId}`
// )

// if(evalRes.data){

// const existingScores = evalRes.data.scores || []

// const roundScores = existingScores.filter(
// s => (s.round || null) === (event.roundBased ? roundName : null)
// )

// if(roundScores.length>0){

// setEditing(true)

// defaultScores = defaultScores.map(c=>{

// const existing = roundScores.find(
// s => s.criteria === c.criteria
// )

// return{
// ...c,
// marks:existing ? existing.marks : 0
// }

// })

// }else{
// setEditing(false)
// }

// }

// }catch{
// setEditing(false)
// }

// setScores(defaultScores)

// }

// /* CHANGE */
// const handleChange = (index,value)=>{

// const updated=[...scores]

// if(Number(value)>updated[index].max){
// alert(`Marks cannot exceed ${updated[index].max}`)
// return
// }

// updated[index].marks=value
// setScores(updated)

// }

// /* SUBMIT */
// const submitMarks = async()=>{

// const user = JSON.parse(localStorage.getItem("user"))
// const judgeId = user.id || user._id

// await API.post("/evaluation/submit",{
// participant:participantId,
// judge:judgeId,
// event:event._id,
// scores:scores
// })

// setEditing(true)

// alert(editing ? "Marks Updated" : "Marks Submitted")

// }

// if(!event) return <h3>Loading...</h3>

// return(
// <div className="evaluation-page">
// <div className="evaluation-card">

// <h2 className="title">{event.name} Evaluation</h2>

// {!selectedRound && (
// <div className="round-list">
// {roundList.map(round=>(
// <div key={round} className="round-row">
// <span>{round}</span>
// <button onClick={()=>openRound(round)}>Evaluate</button>
// </div>
// ))}
// </div>
// )}

// {selectedRound && (
// <>
// <h3>{selectedRound}</h3>

// {scores.map((c,index)=>(
// <div key={index}>
// <b>{c.criteria}</b>
// <input
// type="number"
// value={c.marks}
// onChange={(e)=>handleChange(index,e.target.value)}
// />
// </div>
// ))}

// <button onClick={submitMarks}>
// {editing ? "Update Marks" : "Submit Marks"}
// </button>
// </>
// )}

// </div>
// </div>
// )

// }

// export default EvaluateParticipant







import React, { useEffect, useState, useCallback } from "react"
import API from "../utils/axiosConfig"
import { useParams } from "react-router-dom"
import "./EvaluateParticipant.css"

function EvaluateParticipant() {

  const { participantId } = useParams()

  const [event, setEvent] = useState(null)
  const [roundList, setRoundList] = useState([])
  const [selectedRound, setSelectedRound] = useState(null)

  const [scores, setScores] = useState([])
  const [editing, setEditing] = useState(false)

  /* ================= LOAD DATA ================= */

  const loadData = useCallback(async () => {
    try {

      const participantRes = await API.get(`/participants/${participantId}`)
      const eventId = participantRes.data.event

      const eventRes = await API.get(`/events/${eventId}`)
      setEvent(eventRes.data)

      let rounds = []

      if (eventRes.data.roundBased) {
        for (let i = 1; i <= eventRes.data.rounds; i++) {
          rounds.push(`Round ${i}`)
        }
      } else {
        rounds = ["Main"]
      }

      setRoundList(rounds)

    } catch (err) {
      console.log("Error loading data", err)
    }
  }, [participantId])

  useEffect(() => {
    loadData()
  }, [loadData])

  /* ================= OPEN ROUND ================= */

  const openRound = async (roundName) => {

    setSelectedRound(roundName)

    const user = JSON.parse(localStorage.getItem("user"))
    const judgeId = user.id || user._id

    let defaultScores = event.criteria.map(c => ({
      round: event.roundBased ? roundName : null,
      criteria: c.name,
      marks: 0,
      max: c.maxMarks
    }))

    try {

      const res = await API.get(
        `/evaluation/${event._id}/${participantId}/${judgeId}`
      )

      if (res.data) {

        const existingScores = res.data.scores || []

        const roundScores = existingScores.filter(
          s => (s.round || null) === (event.roundBased ? roundName : null)
        )

        if (roundScores.length > 0) {

          setEditing(true)

          defaultScores = defaultScores.map(c => {
            const existing = roundScores.find(
              s => s.criteria === c.criteria
            )

            return {
              ...c,
              marks: existing ? existing.marks : 0
            }
          })

        } else {
          setEditing(false)
        }
      }

    } catch {
      setEditing(false)
    }

    setScores(defaultScores)
  }

  /* ================= HANDLE INPUT ================= */

  const handleChange = (index, value) => {

    const updated = [...scores]

    if (Number(value) > updated[index].max) {
      alert(`Marks cannot exceed ${updated[index].max}`)
      return
    }

    updated[index].marks = value
    setScores(updated)
  }

  /* ================= SUBMIT ================= */

  const submitMarks = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"))
      const judgeId = user.id || user._id

      await API.post("/evaluation/submit", {
        participant: participantId,
        judge: judgeId,
        event: event._id,
        scores: scores
      })

      setEditing(true)

      alert(editing ? "Marks Updated" : "Marks Submitted")

    } catch (err) {
      console.log(err)
      alert("Error submitting marks")
    }
  }

  /* ================= LOADING ================= */

  if (!event) return <h3 style={{ textAlign: "center" }}>Loading...</h3>

  /* ================= UI ================= */

  return (
    <div className="evaluation-page">

      <div className="evaluation-card">

        <h2 className="title">{event.name} Evaluation</h2>

        {/* ROUND LIST */}
        {!selectedRound && (
          <div className="round-list">

            {roundList.map(round => (
              <div key={round} className="round-row">

                <span className="round-name">{round}</span>

                <button
                  className="evaluate-btn"
                  onClick={() => openRound(round)}
                >
                  Evaluate
                </button>

              </div>
            ))}

          </div>
        )}

        {/* CRITERIA UI */}
        {selectedRound && (
          <>
            <h3 style={{ marginBottom: "15px" }}>{selectedRound}</h3>

            <div className="criteria-list">

              {scores.map((c, index) => (
                <div key={index} className="criteria-item">

                  <div className="criteria-label">

                    <div className="criteria-name">
                      {c.criteria}
                    </div>

                    <div className="max">
                      Max Marks: {c.max}
                    </div>

                  </div>

                  <input
                    className="marks-input"
                    type="number"
                    value={c.marks}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />

                </div>
              ))}

            </div>

            <button
              className="submit-btn"
              onClick={submitMarks}
            >
              {editing ? "Update Marks" : "Submit Marks"}
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default EvaluateParticipant