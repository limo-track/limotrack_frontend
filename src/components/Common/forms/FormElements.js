import React, { useState } from "react"
import MetaTags from "react-meta-tags"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Label,
  Input
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../Breadcrumb"

const FormElements = () => {
  const [customchk, setcustomchk] = useState(true)
  const [customchkPrimary, setcustomchkPrimary] = useState(true)
  const [customchkSuccess, setcustomchkSuccess] = useState(true)
  const [customchkInfo, setcustomchkInfo] = useState(true)
  const [customchkWarning, setcustomchkWarning] = useState(true)
  const [customchkDanger, setcustomchkDanger] = useState(true)
  const [customOutlinePrimary, setcustomOutlinePrimary] = useState(true)
  const [customOutlineSuccess, setcustomOutlineSuccess] = useState(true)
  const [customOutlineInfo, setcustomOutlineInfo] = useState(true)
  const [customOutlineWarning, setcustomOutlineWarning] = useState(true)
  const [customOutlineDanger, setcustomOutlineDanger] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>

                <Row className="mb-3">
                  <label
                    htmlFor="example-search-input"
                    className="col-md-2 col-form-label"
                  >
                    Imei
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="number"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-number-input"
                    className="col-md-2 col-form-label"
                  >
                    Phone
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="number"
                      defaultValue="42"
                      id="example-number-input"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-date-input"
                    className="col-md-2 col-form-label"
                  >
                    Subscription
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      defaultValue="2019-08-19"
                      id="example-date-input"
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">Type</label>
                  <div className="col-md-10">
                    <select className="form-control">
                      <option>Select</option>
                      <option>Large select</option>
                      <option>Small select</option>
                    </select>
                  </div>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </React.Fragment>
  )
}

export default FormElements
