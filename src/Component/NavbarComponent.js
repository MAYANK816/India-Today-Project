import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
const NavbarComponent = () => {
  return (
    <div>
      <Navbar bg="dark" expand="sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: "white" }} />
          <Navbar.Brand href="/"><img src="/images/icon.png" style={{ width: "45px", borderRadius: "8px" }}></img></Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "#f28e23", fontWeight: "bold" }}><img src="/images/Home.png" style={{ width: "25px", borderRadius: "8px", paddingRight: "5px" }}></img>Home</Nav.Link>
              <Nav.Link href="/profile" style={{ color: "#f28e23", fontWeight: "bold" }}><img src="/images/profile.png" style={{ width: "25px", borderRadius: "8px", paddingRight: "5px" }}></img>Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>

    </div>
  )
}

export default NavbarComponent;