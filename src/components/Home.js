import React from "react";
import Upload from "../pages/Upload";

import { useLocation } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';



function Home(){


   const location=useLocation()
   

    return(
        <div className="homepage">
            <MDBNavbar dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand> Welcome to Version Control System</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>           
        <Upload/>
        </div>
    )


}

export default Home