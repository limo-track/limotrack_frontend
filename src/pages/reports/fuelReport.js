import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { tk303Collection } from "../../services/firebase"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { Col, Label, Modal, Row } from "reactstrap"
import Select from "react-select"
import { useSelector } from "react-redux"
import http from "../../services/httpServices"
import { GET_cars, GET_ById } from "../../helpers/url_helper";
import MapModal from "../modals/mapModal"

const FuelReport = props => {

  const group_id = useSelector(state => state.selections.group.id)

  const [data, setData] = useState([])
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState(moment().format('DD-MM-YYYY'))
  const [endDate, setEndDate] = useState(moment().format('DD-MM-YYYY'))

  const loadReport = async () => {
    //console.log(selectedCar)
    const { data:car } = await http.get(`${GET_ById}/${selectedCar.value}`);
   const {tank_size} = car;
    const snapshots = await tk303Collection
      .where("car_id", "==", selectedCar.value)
      .where("fuel_alert", "!=", 0)
      .get()
    const x = []
    snapshots.forEach(doc => {
      doc.data().time = doc.data().time.toDate().toISOString();
      x.push({ id: doc.id, ...doc.data(), time: doc.data().time.toDate(), fuel_consumption: (doc.data().fuel_consumption * tank_size/100) })
    })

    const report = [];
    x.map(item => {
      if (moment(item.time) >= startDate && moment(item.time) < moment(endDate).add('days', 1)){
        report.push(item)
      }
    });

    setData(report)

  }

  const loadCars = async () => {
    // get all group cars
    const { data } = await http.get(`${GET_cars}/${group_id}`)
    const _cars = []
    if (data) {
      data.map(car => {
        _cars.push({
          label: `${car.name} ${car.plate_number}`,
          value: car.id
        })
      })
      setCars(_cars)
    }
  }

  useEffect(async () => {
    await loadCars()
  }, [])

  const handleSelectedCar = (options) => {
    setSelectedCar(options)
  }

  const handleSearch = () => {
      loadReport();
  }

  const handleDateChange = (dates) => {
     if(dates[0]) setStartDate(dates[0])
     if(dates[1]) setEndDate(dates[1])
  }

  return (
    <div className={"page-content"}>

      <Row style={{ marginBottom: 10 }}>
        {/*Car selector*/}
        <Col lg={4}>
          <Label for="basicpill-firstname-input1">
            select
          </Label>
          <Select
            value={selectedCar}
            onChange={handleSelectedCar}
            options={cars}
            isSearchable={true}
          />
        </Col>

        {/*Date picker*/}
        <Col lg={4}>
          <label>Select Date</label>
          <div className="input-group">
            <Flatpickr
              className="form-control d-block"
              defaultValue={startDate}
              options={{
                altInput: true,
                altFormat: "F j, Y",
                mode: "multiple",
                dateFormat: "dd-mm-YYYY"
              }}
              onChange={date => handleDateChange(date)}
            />
          </div>
        </Col>

        {/*Search Button*/}
        <Col lg={4}>
          <button
            onClick={handleSearch}
            className={"btn btn-info mt-lg-4"}
            disabled={!selectedCar}
          >Search</button>
        </Col>
      </Row>

      <table className={"table table-bordered table-striped"}>
        <thead className={"table-dark"} style={{fontSize: 18}}>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Action</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody style={{fontSize: 16}}>
        {data.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{moment(item.time).format("DD-MM-YYYY")}</td>
              <td>{moment(item.time).format("HH:mm")}</td>
              <td><MapModal lat={item.latitude} lng={item.longitude} text={'Location'}/></td>
              <td>{item.fuel_alert === 1 ? "Refuel" : "Leakage"}</td>
              <td>{item.fuel_consumption * -1}</td>
            </tr>
          )
        })}

        </tbody>
      </table>

    </div>
  )
}

export default FuelReport