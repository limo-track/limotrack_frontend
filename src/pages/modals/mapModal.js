import { Col, Modal, Row } from "reactstrap"
import React, { useState } from "react"
import GoogleMap from "../../components/Common/googleMap"


const MapModal = props => {
  const [modalStandard, setModalStandard] = useState(false)


  function tog_standard() {
    setModalStandard(!modalStandard)
    removeBodyCss()
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          tog_standard()
        }}
        className="btn btn-primary "
        data-toggle="modal"
        data-target="#myModal"
      >
        {props.text}
      </button>

      <Modal
        size="lg"
        isOpen={modalStandard}
        toggle={() => {
          tog_standard()
        }}
      >

        <Row>
          <Col lg={0}></Col>
          <Col lg={12}>
            <GoogleMap pos={
              {
                lat: props.lat,
                lng: props.lng
              }
            } />
          </Col>
          {/*<Col lg={1}></Col>*/}

        </Row>

      </Modal>
    </div>
  )
}

export default MapModal