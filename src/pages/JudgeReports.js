import React, { useEffect, useState, useCallback } from "react"
import API from "../utils/axiosConfig"
import "./JudgeReports.css"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import skbpLogo from "../assets/SKBP-logo.jpg"
import msbteLogo from "../assets/msbte-logo.jpg"
import { useLocation } from "react-router-dom"

function JudgeReports() {

  const location     = useLocation()
  const query        = new URLSearchParams(location.search)
  const eventFromURL = query.get("event")

  const user = JSON.parse(localStorage.getItem("user"))

  const [events,     setEvents]     = useState([])
  const [judges,     setJudges]     = useState([])
  const [judgeNames, setJudgeNames] = useState([])

  const [eventId,    setEventId]    = useState(eventFromURL || "")
  const [judgeId,    setJudgeId]    = useState("")
  const [reportType, setReportType] = useState("event")

  const [report, setReport] = useState([])

  /* ─────────────────────────────── */
  /*  FETCH EVENTS                   */
  /* ─────────────────────────────── */

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/all")
      setEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  /* ─────────────────────────────── */
  /*  FETCH JUDGES FOR AN EVENT      */
  /* ─────────────────────────────── */

  const fetchJudgesByEvent = async (id) => {
    try {
      const res = await API.get(`/judges/event/${id}`)
      setJudges(res.data)
    } catch (err) {
      console.log("Error fetching judges", err)
    }
  }

  /* ─────────────────────────────── */
  /*  GENERATE REPORT                */
  /* ─────────────────────────────── */

  const generateReport = useCallback(async (customEventId) => {

    const id = customEventId || eventId

    if (!id) {
      alert("Please select an event")
      return
    }

    try {

      if (reportType === "event") {
        const res = await API.get(`/reports/event/${id}`)
        setJudgeNames(res.data.judges)
        setReport(res.data.data)
      } else {
        if (!judgeId) {
          alert("Please select a judge")
          return
        }
        const res = await API.get(`/reports/judge/${id}/${judgeId}`)
        setJudgeNames([])
        setReport(res.data || [])
      }

    } catch (err) {
      console.log(err)
      alert("Failed to generate report")
    }

  }, [eventId, judgeId, reportType])

  /* ─────────────────────────────── */
  /*  INIT                           */
  /* ─────────────────────────────── */

  useEffect(() => {
    fetchEvents()
    if (eventFromURL) {
      fetchJudgesByEvent(eventFromURL)
      generateReport(eventFromURL)
    }
  }, [eventFromURL, generateReport])

  /* ─────────────────────────────── */
  /*  HELPER — draw PDF header       */
  /*  MSBTE logo | centre text | SKBP*/
  /* ─────────────────────────────── */

  const drawPDFHeader = (doc, eventName, subtitle) => {
    const pageW = doc.internal.pageSize.getWidth()

    // Left logo — MSBTE
    try { doc.addImage(msbteLogo, "PNG", 10, 6, 28, 28) } catch(e) {}

    // Right logo — SKBP
    try { doc.addImage(skbpLogo, "JPG", pageW - 38, 6, 28, 28) } catch(e) {}

    // Centre text
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.text("MSBTE Project Competition", pageW / 2, 13, { align: "center" })

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("organized by", pageW / 2, 19, { align: "center" })

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("Sanjivani K.B.P. Polytechnic, Kopargaon", pageW / 2, 25, { align: "center" })

    // Divider line
    doc.setDrawColor(30, 64, 175)
    doc.setLineWidth(0.5)
    doc.line(10, 36, pageW - 10, 36)

    // Subtitle + event name
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(30, 64, 175)
    doc.text(subtitle, pageW / 2, 42, { align: "center" })

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)
    doc.text(`Event : ${eventName}`, pageW / 2, 48, { align: "center" })
  }

  /* ─────────────────────────────── */
  /*  HELPER — draw judge signatures */
  /* ─────────────────────────────── */

  const drawJudgeSignatures = (doc, names) => {
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)

    // Divider line above signatures
    doc.setDrawColor(180, 180, 180)
    doc.setLineWidth(0.3)
    doc.line(10, pageH - 32, pageW - 10, pageH - 32)

    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.text("Signatures :", 10, pageH - 26)

    if (!names || names.length === 0) {
      doc.setFont("helvetica", "normal")
      doc.text("No judges assigned", 10, pageH - 18)
      return
    }

    // Spread judges evenly across page width
    const usableW  = pageW - 20
    const spacing  = usableW / names.length
    const lineY    = pageH - 18
    const nameY    = pageH - 10

    names.forEach((name, i) => {
      const x = 10 + i * spacing + spacing / 2

      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)

      // Signature line
      doc.text("_________________", x, lineY, { align: "center" })

      // Judge name below line
      doc.setFont("helvetica", "bold")
      doc.text(name, x, nameY, { align: "center" })
    })
  }

  /* ─────────────────────────────── */
  /*  EXPORT PDF                     */
  /* ─────────────────────────────── */

  const exportPDF = () => {

    if (report.length === 0) {
      alert("Generate the report first")
      return
    }

    const doc = new jsPDF({ orientation: "landscape" })

    const selectedEvent = events.find(e => e._id === eventId)
    const eventName     = selectedEvent ? selectedEvent.name : ""

    if (reportType === "event") {

      drawPDFHeader(doc, eventName, "Event Evaluation Report")

      const head = [
        "Sr", "Group ID", "Project Title", "Institute Name",
        ...judgeNames,
        "Average"
      ]

      const body = report.map(r => [
        r.sr,
        r.groupId,
        r.projectTitle,
        r.instituteName,
        ...r.judges.map(j => (j !== null && j !== undefined) ? Number(j).toFixed(2) : "-"),
        r.average
      ])

      autoTable(doc, {
        startY: 54,
        head:   [head],
        body:   body,
        margin: { bottom: 40 },
        styles:             { fontSize: 8, halign: "center" },
        headStyles:         { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 249, 255] },
        columnStyles:       { 2: { halign: "left" }, 3: { halign: "left" } }
      })

      // Judge signatures at bottom — all judges for event report
      drawJudgeSignatures(doc, judgeNames)

    } else {

      const selectedJudgeName = judges.find(j => j._id === judgeId)?.name || "Judge"

      drawPDFHeader(doc, eventName, `Individual Judge Report — ${selectedJudgeName}`)

      const head = ["Sr", "Group ID", "Project Title", "Institute Name", "Marks"]

      const body = report.map(r => [
        r.sr, r.groupId, r.projectTitle, r.instituteName, r.marks
      ])

      autoTable(doc, {
        startY: 54,
        head:   [head],
        body:   body,
        margin: { bottom: 40 },
        styles:             { fontSize: 8, halign: "center" },
        headStyles:         { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 249, 255] },
        columnStyles:       { 2: { halign: "left" }, 3: { halign: "left" } }
      })

      // Only the selected judge signs individual report
      drawJudgeSignatures(doc, [selectedJudgeName])

    }

    doc.save("judge-report.pdf")
  }

  /* ─────────────────────────────── */
  /*  EXPORT EXCEL                   */
  /* ─────────────────────────────── */

  const exportExcel = () => {

    if (report.length === 0) {
      alert("Generate the report first")
      return
    }

    let sheet = []

    if (reportType === "event") {

      sheet = [["Sr", "Group ID", "Project Title", "Institute Name", ...judgeNames, "Average"]]

      report.forEach(r => {
        sheet.push([
          r.sr, r.groupId, r.projectTitle, r.instituteName,
          ...r.judges.map(j => (j !== null && j !== undefined) ? Number(j).toFixed(2) : "-"),
          r.average
        ])
      })

    } else {

      sheet = [["Sr", "Group ID", "Project Title", "Institute Name", "Marks"]]

      report.forEach(r => {
        sheet.push([r.sr, r.groupId, r.projectTitle, r.instituteName, r.marks])
      })

    }

    const ws = XLSX.utils.aoa_to_sheet(sheet)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Report")
    XLSX.writeFile(wb, "judge-report.xlsx")
  }

  /* ─────────────────────────────── */
  /*  COLSPAN for empty state        */
  /* ─────────────────────────────── */

  const totalCols = reportType === "event"
    ? 4 + judgeNames.length + 1
    : 5

  /* ─────────────────────────────── */
  /*  RENDER                         */
  /* ─────────────────────────────── */

  return (

    <div className="report-container">
      <div className="report-box">

        <h2>Judge Reports</h2>

        {user?.role === "coordinator" && (
          <h4 style={{ marginBottom: "15px" }}>
            Event : {events.find(e => e._id === eventId)?.name || ""}
          </h4>
        )}

        {/* ── FILTERS ── */}
        <div className="filters">

          {user?.role !== "coordinator" && (
            <select
              value={eventId}
              onChange={e => {
                const id = e.target.value
                setEventId(id)
                setReport([])
                setJudgeNames([])
                if (id) fetchJudgesByEvent(id)
              }}
            >
              <option value="">Select Event</option>
              {events.map(e => (
                <option key={e._id} value={e._id}>{e.name}</option>
              ))}
            </select>
          )}

          <select
            value={reportType}
            onChange={e => {
              setReportType(e.target.value)
              setReport([])
              setJudgeNames([])
            }}
          >
            <option value="event">Event Report</option>
            <option value="judge">Individual Judge Report</option>
          </select>

          {reportType === "judge" && (
            <select
              value={judgeId}
              onChange={e => setJudgeId(e.target.value)}
            >
              <option value="">Select Judge</option>
              {judges.map(j => (
                <option key={j._id} value={j._id}>{j.name}</option>
              ))}
            </select>
          )}

        </div>

        {/* ── BUTTONS ── */}
        <div className="buttons">
          <button onClick={() => generateReport()}>Generate Report</button>
          <button onClick={exportPDF}>Export PDF</button>
          <button onClick={exportExcel}>Export Excel</button>
        </div>

        {/* ── TABLE ── */}
        <div style={{ overflowX: "auto" }}>
          <table>

            <thead>
              <tr>
                <th>Sr</th>
                <th>Group ID</th>
                <th>Project Title</th>
                <th>Institute Name</th>
                {reportType === "event" ? (
                  <>
                    {judgeNames.map((name, i) => (
                      <th key={i}>{name}</th>
                    ))}
                    <th>Average</th>
                  </>
                ) : (
                  <th>Marks</th>
                )}
              </tr>
            </thead>

            <tbody>
              {report.length === 0 ? (
                <tr>
                  <td colSpan={totalCols} style={{ color: "#888", fontStyle: "italic" }}>
                    No report generated yet. Select filters and click Generate Report.
                  </td>
                </tr>
              ) : (
                report.map(r => (
                  <tr key={r.sr}>
                    <td>{r.sr}</td>
                    <td>{r.groupId}</td>
                    <td style={{ textAlign: "left" }}>{r.projectTitle}</td>
                    <td style={{ textAlign: "left" }}>{r.instituteName}</td>

                    {reportType === "event" ? (
                      <>
                        {r.judges.map((score, i) => (
                          <td key={i}>
                            {(score !== null && score !== undefined)
                              ? Number(score).toFixed(2)
                              : <span style={{ color: "#aaa" }}>—</span>}
                          </td>
                        ))}
                        <td style={{ fontWeight: "bold", background: "#eef4ff" }}>
                          {r.average}
                        </td>
                      </>
                    ) : (
                      <td style={{ fontWeight: "bold" }}>{r.marks}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>

  )

}

export default JudgeReports
