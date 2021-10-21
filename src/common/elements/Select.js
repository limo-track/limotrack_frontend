import { Row } from "reactstrap"
import React from "react"

const Select = ({ label, value, name, disabled = false, options, error = false, elem, handleChange }) => {

  return (
    <Row className="mb-3">
      <label className="col-md-2 col-form-label">
        {label}
      </label>
      <div className="col-md-9">
        <select
          className={error ? "form-control alert-danger" : "form-control"}
          value={value}
          name={name}
          disabled={disabled}
          onChange={(e)=>handleChange(e.target)}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.id}>{option[elem]}</option>
            )
          })}

        </select>
      </div>
    </Row>
  )
}

export default Select