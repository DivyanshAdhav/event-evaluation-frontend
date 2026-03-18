// import React from "react"
// import Layout from "../components/Layout"
// import {Row,Col,Card} from "react-bootstrap"
// import {useNavigate} from "react-router-dom"
// import {FaUsers,FaClipboardList,FaTrophy,FaUserTie,FaChartBar} from "react-icons/fa"
// import "./AdminDashboard.css"

// function AdminDashboard(){

// const navigate=useNavigate()

// return(

// <Layout>

// <h2 className="dashboard-title">Admin Dashboard</h2>

// <Row>

// <Col md={4} className="mb-4">

// <Card className="dashboard-card"
// onClick={()=>navigate("/create-event")}
// >

// <div className="icon">
// <FaClipboardList size={32}/>
// </div>

// <h4>Create Event</h4>

// </Card>

// </Col>

// <Col md={4} className="mb-4">

// <Card className="dashboard-card"
// onClick={()=>navigate("/add-judge")}
// >

// <div className="icon">
// <FaUserTie size={32}/>
// </div>

// <h4>Add Judge</h4>

// </Card>

// </Col>

// <Col md={4} className="mb-4">

// <Card className="dashboard-card"
// onClick={()=>navigate("/add-participants")}
// >

// <div className="icon">
// <FaUsers size={32}/>
// </div>

// <h4>Add Participants</h4>

// </Card>

// </Col>

// <Col md={4} className="mb-4">

// <Card className="dashboard-card"
// onClick={()=>navigate("/judge-report")}
// >

// <div className="icon">
// <FaChartBar size={32}/>
// </div>

// <h4>Judge Report</h4>

// </Card>

// </Col>

// <Col md={4} className="mb-4">

// <Card className="dashboard-card"
// onClick={()=>navigate("/leaderboard")}
// >

// <div className="icon">
// <FaTrophy size={32}/>
// </div>

// <h4>Leaderboard</h4>

// </Card>

// </Col>

// </Row>

// </Layout>

// )

// }

// export default AdminDashboard

import React from "react"
import {Row,Col,Card,Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {FaUsers,FaClipboardList,FaTrophy,FaUserTie,FaChartBar} from "react-icons/fa"
import "./AdminDashboard.css"

function AdminDashboard(){

const navigate = useNavigate()

/* Logout */

const logout = ()=>{
localStorage.removeItem("user")
navigate("/")
}

return(

<div className="admin-page">

<Container className="admin-container">

{/* HEADER */}

<div className="admin-header">

<h1 className="admin-heading">
Admin Dashboard
</h1>

<button
className="logout-btn"
onClick={logout}
>
Logout
</button>

</div>


<Row className="g-4">

<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/create-event")}
>
<div className="admin-icon">
<FaClipboardList size={36}/>
</div>
<h4>Create Event</h4>
</Card>
</Col>


<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/add-judge")}
>
<div className="admin-icon">
<FaUserTie size={36}/>
</div>
<h4>Add Judge</h4>
</Card>
</Col>


<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/coordinator")}
>
<div className="admin-icon">
<FaUserTie size={36}/>
</div>
<h4>Add Coordinator</h4>
</Card>
</Col>


<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/add-participants")}
>
<div className="admin-icon">
<FaUsers size={36}/>
</div>
<h4>Add Participants</h4>
</Card>
</Col>


<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/judge-report")}
>
<div className="admin-icon">
<FaChartBar size={36}/>
</div>
<h4>Judge Report</h4>
</Card>
</Col>


<Col md={4} sm={6} xs={12}>
<Card
className="admin-card"
onClick={()=>navigate("/leaderboard")}
>
<div className="admin-icon">
<FaTrophy size={36}/>
</div>
<h4>Leaderboard</h4>
</Card>
</Col>

</Row>
</Container>

</div>

)

}

export default AdminDashboard