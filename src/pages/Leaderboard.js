import React, { useEffect, useState } from "react"
import API from "../utils/axiosConfig"
import "./JudgeReports.css"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import skbpLogo from "../assets/SKBP-logo.jpg"
import msbteLogo from "../assets/msbte-logo.jpg"

function Leaderboard() {

  const [events,     setEvents]     = useState([])
  const [eventId,    setEventId]    = useState("")
  const [judgeNames, setJudgeNames] = useState([])
  const [data,       setData]       = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

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
  /*  GENERATE LEADERBOARD           */
  /* ─────────────────────────────── */

  const generateLeaderboard = async () => {

    if (!eventId) {
      alert("Please select an event")
      return
    }

    try {
      const res = await API.get(`/reports/leaderboard/${eventId}`)
      setJudgeNames(res.data.judges)
      setData(res.data.data)
    } catch (err) {
      console.log(err)
      alert("Failed to generate leaderboard")
    }

  }

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
    doc.setTextColor(21, 128, 61)
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
    const usableW = pageW - 20
    const spacing = usableW / names.length
    const lineY   = pageH - 18
    const nameY   = pageH - 10

    names.forEach((name, i) => {
      const x = 10 + i * spacing + spacing / 2

      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.text("_________________", x, lineY, { align: "center" })

      doc.setFont("helvetica", "bold")
      doc.text(name, x, nameY, { align: "center" })
    })
  }

  /* ─────────────────────────────── */
  /*  EXPORT PDF                     */
  /* ─────────────────────────────── */

  const exportPDF = () => {

    if (data.length === 0) {
      alert("Generate the leaderboard first")
      return
    }

    const doc = new jsPDF({ orientation: "landscape" })

    const eventName = events.find(e => e._id === eventId)?.name || ""

    drawPDFHeader(doc, eventName, "Event Leaderboard")

    const head = [
      "Rank", "Group ID", "Project Title", "Institute Name",
      ...judgeNames,
      "Average"
    ]

    const body = data.map(d => [
      d.rank,
      d.groupId,
      d.projectTitle,
      d.instituteName,
      ...d.judgeScores.map(s =>
        (s !== null && s !== undefined) ? Number(s).toFixed(2) : "-"
      ),
      d.average
    ])

    autoTable(doc, {
      startY: 54,
      head:   [head],
      body:   body,
      margin: { bottom: 40 },
      styles:             { fontSize: 8, halign: "center" },
      headStyles:         { fillColor: [0, 0, 0], textColor: [255, 255, 255], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 255, 248] },
      columnStyles:       { 2: { halign: "left" }, 3: { halign: "left" } }
    })

    // All judges sign the leaderboard
    drawJudgeSignatures(doc, judgeNames)

    doc.save("leaderboard.pdf")
  }

  /* ─────────────────────────────── */
  /*  EXPORT EXCEL                   */
  /* ─────────────────────────────── */

  const exportExcel = () => {

    if (data.length === 0) {
      alert("Generate the leaderboard first")
      return
    }

    const sheet = [
      ["Rank", "Group ID", "Project Title", "Institute Name", ...judgeNames, "Average"]
    ]

    data.forEach(d => {
      sheet.push([
        d.rank, d.groupId, d.projectTitle, d.instituteName,
        ...d.judgeScores.map(s =>
          (s !== null && s !== undefined) ? Number(s).toFixed(2) : "-"
        ),
        d.average
      ])
    })

    const ws = XLSX.utils.aoa_to_sheet(sheet)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Leaderboard")
    XLSX.writeFile(wb, "leaderboard.xlsx")
  }

  /* ─────────────────────────────── */
  /*  TOTAL COLSPAN                  */
  /* ─────────────────────────────── */

  const totalCols = 4 + judgeNames.length + 1

  /* ─────────────────────────────── */
  /*  RENDER                         */
  /* ─────────────────────────────── */

  return (

    <div className="report-container">
      <div className="report-box">

        <h2>Leaderboard</h2>

        {/* ── FILTERS ── */}
        <div className="filters">
          <select
            value={eventId}
            onChange={e => {
              setEventId(e.target.value)
              setData([])
              setJudgeNames([])
            }}
          >
            <option value="">Select Event</option>
            {events.map(e => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>
        </div>

        {/* ── BUTTONS ── */}
        <div className="buttons">
          <button onClick={generateLeaderboard}>Generate Leaderboard</button>
          <button onClick={exportPDF}>Export PDF</button>
          <button onClick={exportExcel}>Export Excel</button>
        </div>

        {/* ── TABLE ── */}
        <div style={{ overflowX: "auto" }}>
          <table>

            <thead>
              <tr>
                <th>Rank</th>
                <th>Group ID</th>
                <th>Project Title</th>
                <th>Institute Name</th>
                {judgeNames.map((name, i) => (
                  <th key={i}>{name}</th>
                ))}
                <th>Average</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={totalCols} style={{ color: "#888", fontStyle: "italic" }}>
                    No leaderboard generated yet. Select an event and click Generate Leaderboard.
                  </td>
                </tr>
              ) : (
                data.map(d => (
                  <tr key={d.rank}>
                    <td>
                      {d.rank === 1 ? "🥇" : d.rank === 2 ? "🥈" : d.rank === 3 ? "🥉" : d.rank}
                    </td>
                    <td>{d.groupId}</td>
                    <td style={{ textAlign: "left" }}>{d.projectTitle}</td>
                    <td style={{ textAlign: "left" }}>{d.instituteName}</td>
                    {d.judgeScores.map((score, i) => (
                      <td key={i}>
                        {(score !== null && score !== undefined)
                          ? Number(score).toFixed(2)
                          : <span style={{ color: "#aaa" }}>—</span>}
                      </td>
                    ))}
                    <td style={{ fontWeight: "bold", background: "#efffef" }}>
                      {d.average}
                    </td>
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

export default Leaderboard
