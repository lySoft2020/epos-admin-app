import React, { useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container, Card, InputGroup } from "react-bootstrap";

// import "../styles.css";

export default function Activation() {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://192.168.56.1/keygenerator/keygen.dll"
      : "https://admin.novusoft.co.uk/keygenerator/keygen.dll";

  console.log(BASE_URL, "Base url");

  const [state, setState] = useState({
    activate: {
      telephone: "",
      postcode: "",
      keyNumber: "",
      days: "90",
    },
  });

  const activationCodeRef = useRef();

  const handleCopy = async () => {
    const copyText = activationCodeRef.current.value;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (error) {
      console.log("Faild to copy", error);
    }
  };

  const updateControls = (e) => {
    setState({
      ...state,
      activate: {
        ...state.activate,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleGenKey = async (e) => {
    e.preventDefault();
    const shopTelephone = state.activate.telephone;
    const shopPostcode = state.activate.postcode;
    const keyNum = state.activate.keyNumber;
    const numOfDays = state.activate.days;

    try {
      const response = await axios.get(`${BASE_URL}/getkey`, {
        params: {
          telephone: shopTelephone,
          postcode: shopPostcode,
          keynum: keyNum,
          numberOfDays: numOfDays,
        },
      });
      // const params = new URLSearchParams({
      //   telephone: shopTelephone,
      //   postcode: shopPostcode,
      //   keynum: keyNum,
      //   numberOfDays: numOfDays,
      // });
      // try {
      //   const url = `http://192.168.56.1/keygenerator/keygen.dll/getkey?${params.toString()}`;
      //   console.log(url);
      //   const response = await fetch(url);
      //   console.log(response, "the response back");
      activationCodeRef.current.value = response.data.KeyNumber;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-3">
      {/* <pre>{JSON.stringify(state)}</pre> */}
      <Card bg="dark" text="white" className="shadow-lg">
        <Card.Header className="p-2 ">
          <h3>Novusoft Activation App</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="shop-telephone">
              <Form.Label>Shop Telephone</Form.Label>
              <Form.Control
                name="telephone"
                onChange={updateControls}
                type="text"
                placeholder="type the shop telephone number"
                aria-label="shop-telephone"
                aria-describedby="shop-telephone-lg"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="shop-postcode">
              <Form.Label>Shop Postcode</Form.Label>
              <Form.Control
                name="postcode"
                onChange={updateControls}
                type="text"
                placeholder="type the shop postcode"
                aria-label="shop-postcode"
                aria-describedby="shop-postcode-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Key-Number">
              <Form.Label>Key Number</Form.Label>
              <Form.Control
                name="keyNumber"
                onChange={updateControls}
                type="text"
                placeholder="type the key number"
                aria-label="Key-Number"
                aria-describedby="Key-Number-lg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Number-of-Days">
              <Form.Label>Number of Days</Form.Label>
              <Form.Control
                name="days"
                onChange={updateControls}
                type="text"
                placeholder="type the number of days"
                aria-label="Number-of-Days"
                aria-describedby="Number-of-Days-lg"
                defaultValue={90}
              />
            </Form.Group>
            <Form.Group className="d-grid gap-2 mb-3" controlId="generate-key">
              <Button
                type="submit"
                size="lg"
                variant="secondary"
                onClick={handleGenKey}
              >
                Generate Key
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Activation Key</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="Activation-Key"
                  readOnly
                  ref={activationCodeRef}
                  aria-describedby="Activation-Key-lg"
                  aria-label="Activation-Key"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Copy
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
