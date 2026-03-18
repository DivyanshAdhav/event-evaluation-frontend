import React from "react";
import {Navbar,Nav,Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function TopNavbar(){

const navigate = useNavigate();

const logout = () => {

localStorage.removeItem("token");
navigate("/");

};

return(

<Navbar bg="dark" variant="dark" expand="lg">

<Container>

<Navbar.Brand style={{fontWeight:"bold"}}>
Sanjivani K.B.P. Polytechnic
</Navbar.Brand>

<Navbar.Toggle/>

<Navbar.Collapse>

<Nav className="ms-auto">
<Nav.Link onClick={logout}>
Logout
</Nav.Link>

</Nav>

</Navbar.Collapse>

</Container>

</Navbar>

);

}

export default TopNavbar;