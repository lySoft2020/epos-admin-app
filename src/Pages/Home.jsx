import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <Container className="mt-3">
      <Card bg="dark" text="white" className="shadow-lg">
        <Card.Header className="p-2 ">
          <h3>Epos Infinity Managment System</h3>
        </Card.Header>
        <Card.Body>
          <Button
            variant="secondary"
            className="btn-lg m-2"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            className="btn-lg"
            onClick={handleRegister}
          >
            Register
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
