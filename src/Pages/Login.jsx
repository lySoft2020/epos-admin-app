import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../features/authService";

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const navigate = useNavigate();

  const handleNotRegistered = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    if (username === "" || password === "") {
      toast.error("Please fill in all fields");
    } else {
      try {
        const result = await authService.login(userData);

        console.log("handleLogin result", result);
        if (
          result.response?.status === 400 ||
          result.response?.status === 401 ||
          result.response?.status === 402
        ) {
          toast.error(result.response.data.message);
        } else if (result.username === username) {
          navigate("/customers");
          //window.location = "/customers";
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const updateLogin = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Container className="mt-3">
        <Card bg="dark" text="white" className="shadow-lg">
          <Card.Header className="p-2 ">
            <h3>Login</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  onChange={updateLogin}
                  type="text"
                  placeholder="type your user name"
                  aria-label="username"
                  aria-describedby="Username-lg"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={updateLogin}
                  type="password"
                  placeholder="type your password"
                  aria-label="Password"
                  aria-describedby="Password-lg"
                />
              </Form.Group>

              <Form.Group className="d-grid gap-2 ">
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form.Group>

              <Button variant="link" onClick={handleNotRegistered}>
                Not registered
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
