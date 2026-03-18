import React from "react";
import TopNavbar from "./Navbar";

function Layout({children}){

return(

<>

<TopNavbar/>

<div className="page-container">

{children}

</div>

</>

);

}

export default Layout;