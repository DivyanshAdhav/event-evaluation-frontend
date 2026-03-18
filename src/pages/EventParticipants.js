import React, { useState, useEffect, useCallback } from "react"
import API from "../utils/axiosConfig"
import { useParams, useNavigate } from "react-router-dom"
import "./EventParticipants.css"

function EventParticipants() {

  const { eventId } = useParams()
  const [participants, setParticipants] = useState([])
  const [judge, setJudge] = useState(null)

  const navigate = useNavigate()

  /* FETCH LOGGED IN JUDGE */

  const fetchJudge = useCallback(async () => {
    try {
      const judgeId = localStorage.getItem("judgeId")
      if (!judgeId) return

      const res = await API.get(`/judges/${judgeId}`)
      setJudge(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  /* FETCH EVENT PARTICIPANTS */

  const fetchParticipants = useCallback(async () => {
    try {
      const res = await API.get(`/participants/event/${eventId}`)
      setParticipants(res.data)
    } catch (err) {
      console.log(err)
    }
  }, [eventId])

  useEffect(() => {
    fetchJudge()
    fetchParticipants()
  }, [fetchJudge, fetchParticipants])

  /* FILTER BY ASSIGNED PARTICIPANTS */

  const filteredParticipants = participants.filter(p => {
    if (!judge) return false

    if (!judge.assignedParticipants || judge.assignedParticipants.length === 0) {
      return true
    }

    return judge.assignedParticipants.some(
      ap => ap._id.toString() === p._id.toString()
    )
  })

  return (

    <div className="participants-page">

      <h2 className="title">Participants</h2>

      <div className="participants-list">

        {filteredParticipants.length === 0 ? (

          <p>No participants assigned</p>

        ) : (

          filteredParticipants.map((p, index) => (

            <div key={p._id} className="participant-card">

              <div className="participant-info">

                <span className="participant-index">{index + 1}.</span>

                <div className="participant-details">
                  <span className="participant-name">
                    <strong>Group ID:</strong> {p.groupId}
                  </span>
                  <span className="participant-sub">
                    <strong>Project:</strong> {p.projectTitle}
                  </span>
                  <span className="participant-sub">
                    <strong>Institute:</strong> {p.instituteName}
                  </span>
                </div>

              </div>

              <button
                className="evaluate-btn"
                onClick={() => navigate(`/evaluate/${p._id}`)}
              >
                Evaluate
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  )

}

export default EventParticipants
