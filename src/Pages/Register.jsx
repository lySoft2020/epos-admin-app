import React, { useState } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputControl from "./Components/InputControl";
import authService from "../features/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handelAlreadyRegistered = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "type your username",
      errormessage:
        "username should be 4 to 10 characters and should not include any special characters",
      label: "Username",
      pattern: "^[A-Za-z0-9]{4,10}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "type your email",
      errormessage: "should have a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "type your password",
      errormessage: "should be 8 to 20 characters",
      label: "Password",
      pattern: ".{8,20}",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "confirm your password",
      errormessage: "passwords don't match",
      label: "Confirm Password",
      pattern: state.password,
      required: true,
    },
  ];
  const updateControls = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords don't match");
    } else {
      const userData = {
        username: username,
        email: email,
        password: password,
      };
      try {
        const user = await authService.register(userData);
        if (user.response?.status === 201) {
          // window.location = "/customers";
          // we need to send them to the login page because their
          // account is pending
          navigate(`/login`);
          // window.location = "/login";
        } else {
          toast.error(user.response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <Container className="mt-3">
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <Card bg="dark" text="white" className="shadow-lg">
        <Card.Header className="p-2 ">
          <h3>Epos Infinity User Registration</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            {inputs.map((input) => (
              <InputControl
                key={input.id}
                {...input}
                value={state[input.name]}
                onChange={updateControls}
              />
            ))}
          </Form>
          <div className="div-buttons">
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              onClick={handleRegister}
            >
              Register
            </Button>

            <Button variant="link" size="lg" onClick={handelAlreadyRegistered}>
              Already Registered
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
