import React, { Component } from "react"
import { carsCollection, tk303Collection, tk103Collection } from "../../services/firebase"
import Knob from "../../components/Common/charts/knob"
import GoogleMap from "../../components/Common/googleMap"
import { Col, Row } from "reactstrap"
import { Fab } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import SpeedGauge from "./speedGauge"
import FuelReport from "../reports/fuelReport"
import FuelGauge from "./fuelGauge"

export default class CarDashboard extends Component {

  state = {
    imei: null,
    id: null,
    firebaseId: null,
    gpsData: {}
  }

  unsubscribe;

  async componentDidMount() {

    const { id, imei } = this.props.location.state
    this.setState({ imei, id })

    const snapshots = await carsCollection.where("imei", "==", imei).get()
    const x = []
    snapshots.forEach(doc => x.push({ id: doc.id, ...doc.data() }))
    if (x.length > 0) {
      this.unsubscribe = carsCollection.doc(x[0].id)
        .onSnapshot((doc) => {
          this.setState({ gpsData: doc.data(), firebaseId: x[0].id })
        })
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe)
      this.unsubscribe()
  }

  render() {
    return (
      <div className={"page-content"}>

        <Row>
          <Col lg={1}>
            <Fab color="primary" aria-label="add"
                 onClick={() => {
                   this.props.history.push({ pathname: "/carForm", state: this.props.location.state })
                 }}
            >
              <SettingsIcon style={{ color: "white" }} />
            </Fab>
          </Col>

          {/*Fuel*/}
          <Col lg={5}>
            <FuelGauge fuel={parseFloat(this.state.gpsData.fuel_level) } />
          </Col>

          {/*Speed*/}
          <Col lg={5}>
            <SpeedGauge speed={parseFloat(this.state.gpsData.speed)} />
          </Col>
        </Row>

        <GoogleMap pos={
          {
            lat: parseFloat(this.state.gpsData.latitude) ? parseFloat(this.state.gpsData.latitude) : 0,
            lng: parseFloat(this.state.gpsData.longitude) ? parseFloat(this.state.gpsData.longitude) : 0
          }
        } />


      </div>
    )
  }
}