import React from 'react';
import { NavLink  } from "react-router-dom";
import { Nav,Navbar} from "react-bootstrap";


function Header() {
  return (
    <header>
    <Navbar bg="dark" expand="lg" variant="dark">  
    <img src={require('../img/Services-header-full.png')} className='navLogo p-2' width={'150'} />
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto navbtn"  />
    
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto text-white">
      
        <NavLink  className='nav-link' to="/tableData">Dashboard</NavLink >
        <NavLink  className='nav-link' to="/Blank">Blank</NavLink >
      </Nav>
    
  </Navbar.Collapse>
</Navbar>
    </header>

  );
}

export default Header;
