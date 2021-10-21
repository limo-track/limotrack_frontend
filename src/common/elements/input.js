import { Row, Col } from "reactstrap"
import React from "react"

const Input = ({
                 name,
                 type,
                 value,
                 label,
                 disabled=false,
                 error = false,
                 handleChange
               }) => {

  return (
    <Row className="mb-3">
      <label
        htmlFor={"name"}
        className="col-md-2 col-form-label"
      >
        {label}
      </label>
      <Col className="col-md-9">
        <input
          className={error ? "form-control alert-danger" : "form-control"}
          id={name}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e.target)}
        />
      </Col>
    </Row>
  )
}

export default Input