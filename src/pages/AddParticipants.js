import React, { useState, useEffect } from "react"
import API from "../utils/axiosConfig"
import "./AddParticipants.css"

function AddParticipants() {

  const [file, setFile] = useState(null)
  const [participants, setParticipants] = useState([])

  /* Fetch Participants */

  const fetchParticipants = async () => {
    const res = await API.get("/participants/all")
    setParticipants(res.data)
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  /* Upload Excel */

  const uploadExcel = async () => {
    if (!file) {
      alert("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await API.post("/participants/upload-excel", formData)
      alert(res.data.message || "Participants uploaded successfully")
      fetchParticipants()
    } catch (err) {
      alert("Error uploading file")
    }
  }

  /* Reject Participant */

  const rejectParticipant = async (id) => {
    await API.put(`/participants/reject/${id}`)
    fetchParticipants()
  }

  /* Accept Participant */

  const acceptParticipant = async (id) => {
    await API.put(`/participants/accept/${id}`)
    fetchParticipants()
  }

  /* Group active participants by Event */

  const groupedParticipants = participants
    .filter(p => p.status === "active")
    .reduce((groups, p) => {
      const eventName = p.event?.name || "Unknown Event"
      if (!groups[eventName]) {
        groups[eventName] = []
      }
      groups[eventName].push(p)
      return groups
    }, {})

  return (

    <div className="page">

      {/* UPLOAD SECTION */}
      <div className="card">

        <h2 className="title">Add Participants</h2>

        <p className="hint">
          Upload an Excel file with columns: <strong>Group ID</strong>, <strong>Project Title</strong>, <strong>Institute Name</strong>, <strong>Event</strong>
        </p>

        <div className="upload-section">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="primary-btn"
            onClick={uploadExcel}
          >
            Upload Excel
          </button>
        </div>

      </div>

      {/* ACTIVE PARTICIPANTS */}
      <div className="card">

        <h2 className="title">Active Participants</h2>

        {Object.keys(groupedParticipants).length === 0 ? (
          <p className="empty-msg">No active participants found.</p>
        ) : (

          Object.keys(groupedParticipants).map(eventName => (

            <div key={eventName} className="event-group">

              <h3 className="event-title">{eventName}</h3>

              {groupedParticipants[eventName].map((p, index) => (

                <div key={p._id} className="participant-card">

                  <div className="participant-meta">
                    <p className="participant-name">
                      <strong>{index + 1}. Group ID: {p.groupId}</strong>
                    </p>
                    <p>Project: {p.projectTitle}</p>
                    <p>Institute: {p.instituteName}</p>
                  </div>

                  <button
                    className="reject-btn"
                    onClick={() => rejectParticipant(p._id)}
                  >
                    Reject
                  </button>

                </div>

              ))}

            </div>

          ))

        )}

      </div>

      {/* REJECTED PARTICIPANTS */}
      <div className="card">

        <h2 className="title">Rejected Participants</h2>

        {participants.filter(p => p.status === "rejected").length === 0 ? (
          <p className="empty-msg">No rejected participants.</p>
        ) : (

          participants
            .filter(p => p.status === "rejected")
            .map((p, index) => (

              <div key={p._id} className="participant-card rejected">

                <div className="participant-meta">
                  <p className="participant-name">
                    <strong>{index + 1}. Group ID: {p.groupId}</strong>
                  </p>
                  <p>Project: {p.projectTitle}</p>
                  <p>Institute: {p.instituteName}</p>
                  <p>Event: {p.event ? p.event.name : "N/A"}</p>
                </div>

                <button
                  className="accept-btn"
                  onClick={() => acceptParticipant(p._id)}
                >
                  Accept
                </button>

              </div>

            ))

        )}

      </div>

    </div>

  )

}

export default AddParticipants
