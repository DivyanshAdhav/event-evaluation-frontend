import React, { useEffect, useState } from "react"
import API from "../utils/axiosConfig"
import "./JudgeReport.css"

function JudgeReport() {

  const [report, setReport] = useState([])

  useEffect(() => {
    fetchReport()
  }, [])

  const fetchReport = async () => {
    try {
      const res = await API.get("/evaluation/report")
      setReport(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <div className="report-page">

      <div className="report-card">

        <h2 className="title">Judge Report</h2>

        <div className="table-container">

          <table className="report-table">

            <thead>
              <tr>
                <th>Event</th>
                <th>Group ID</th>
                <th>Project Title</th>
                <th>Institute</th>
                <th>Total Marks</th>
              </tr>
            </thead>

            <tbody>
              {report.map((r, index) => (
                <tr key={index}>
                  <td>{r.event?.name}</td>
                  <td>{r.participant?.groupId}</td>
                  <td>{r.participant?.projectTitle}</td>
                  <td>{r.participant?.instituteName}</td>
                  <td className="marks">{r.total}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default JudgeReport
