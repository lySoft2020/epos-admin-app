import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function InputControl(props) {
  const { label, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocused = (e) => {
    setFocused(true);
  };
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        focused={focused.toString()}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        aria-label={props.name}
        aria-describedby={props.name + id}
      />
      <span>{props.errormessage}</span>
    </Form.Group>
  );
}
