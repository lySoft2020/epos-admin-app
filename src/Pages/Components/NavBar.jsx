import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import "../../styles.css";
import { ReactComponent as Logo } from "../../logo.svg";

export default function NavBar({ user }) {
  const userObj = JSON.parse(user);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Logo
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Epos Infinity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userObj ? (
              <>
                <div className="nav-spacing">
                  <NavLink className="nav-item nav-link" to="/activation">
                    Activation
                  </NavLink>
                </div>
                <div className="nav-spacing">
                  <NavLink className="nav-item nav-link" to="/customers">
                    Customers
                  </NavLink>
                </div>
                <div className="nav-spacing nav-align">
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                  {!!userObj && (
                    <div className="nav-text">({userObj.username})</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="nav-spacing">
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                </div>
                <div className="nav-spacing">
                  <NavLink className="nav-item nav-link" to="/register">
                    Register
                  </NavLink>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
