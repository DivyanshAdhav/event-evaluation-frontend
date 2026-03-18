import React, { useState } from "react"
import API from "../utils/axiosConfig"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import skbpLogo from "../assets/SKBP-logo.jpg"
import msbteLogo from "../assets/msbte-logo.jpg"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post("/auth/login", { email, password })

      const user = res.data

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("userId", user.id)

      if (user.role === "judge") {
        localStorage.setItem("judgeId", user.id)
      }

      if (user.role === "coordinator") {
        localStorage.setItem("coordinatorId", user.id)
      }

      if (user.role === "admin")       navigate("/admin")
      if (user.role === "judge")       navigate("/judge")
      if (user.role === "coordinator") navigate("/coordinator-dashboard")

    } catch (err) {
      console.log(err)
      alert("Invalid Credentials")
    }

  }

  return (

    <div className="login-page">

      <div className="login-container">

        {/* ── TOP BANNER ── */}
        <div className="login-banner">

          <img src={msbteLogo}  alt="MSBTE Logo"  className="banner-logo" />

          <div className="banner-text">
            <p className="banner-title">MSBTE Project Competition</p>
            <p className="banner-sub">organized by</p>
            <p className="banner-college">
              Sanjivani K.B.P. Polytechnic, Kopargaon
            </p>
          </div>

          <img src={skbpLogo} alt="SKBP Logo" className="banner-logo" />

        </div>

        {/* ── LOGIN FORM ── */}
        <div className="login-box">

          <h2 className="login-title">Login</h2>

          <form onSubmit={handleLogin} className="login-form">

            <input
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button">Login</button>

          </form>

        </div>

      </div>

    </div>

  )

}

export default Login