import { Card, CardBody, Col, Row } from "reactstrap"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import Input from "../../common/elements/input"

const Driver = props => {

  const errorMessages = {
    name: {
      ar: "من فضلك ادخل اسم السائق",
      en: "Please Enter Driver Name"
    },
    license: { ar: "يجيب ادخال رقم رخصه القياده", en: "Please enter Driver License Number" },
    national_id: { ar: "يجب إدخال الرقم القومي", en: "Please Enter National ID" },
    server: { ar: "خطأ في الخادم حاول لاحقا", en: "Server Error!" }

  }
  const { data } = props.location.state
  const isEdit = !!data;
  console.log('isEdit', isEdit)
  const group_id = props.location.state.group_id
  const lang = useSelector(state => state.Login.lang)
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    address: "",
    license: "",
    national_id: ""
  })
  const [errors, setErrors] = useState({
    name: false,
    license: false,
    national_id: false,
    server: false
  })

  const validate = (driver) => {
    let x = {
      name: false,
      license: false,
      national_id: false,
      server: false
    };
    let flag = false;
    if(!driver.name){
      x = {...x, name: true}
      flag = true
    }
    if(!driver.license){
      x = {...x, license: true}
      flag = true
    }
    if(!driver.national_id){
      x = {...x, national_id: true}
      flag = true
    }
    setErrors(x);
    return !flag
  }

  useEffect(async () => {
    if (data) {
      setDriver(data)
    }
  }, []);

  const save = async () => {
    const validationResult = validate(driver);

    if(!validationResult) return

    setErrors({
      name: false,
      license: false,
      national_id: false,
      server: false
    })

    if (isEdit) {
      try{
        await http.put(URL.UPDATE_driver, {driver})
      }catch (e){
        return setErrors({...errors, server: true})
      }

    } else {
      const newDriver = {...driver, group_id}
      console.log(newDriver)
      await http.post(URL.CREATE_drivers, { driver: newDriver})
    }
    props.history.push("/drivers")
  }

  const handleInputChange = ({ name, value }) => {
    setDriver({ ...driver, [name]: value });
  }

  return (
    <div className={"page-content"}>
      <Card>
        <CardBody>
          {
            (errors.name || errors.license || errors.national_id || errors.server) &&
            (<div className={"alert alert-danger"}>
              {errors.name && <p> {lang === "en" ? errorMessages.name.en : errorMessages.name.ar} </p>}
              {errors.server && <p>{lang === "en" ? errorMessages.server.en : errorMessages.server.ar}</p>}
              {errors.license && <p>{lang === "en" ? errorMessages.license.en : errorMessages.license.ar}</p>}
              {errors.national_id && <p>{lang === "en" ? errorMessages.national_id.en : errorMessages.national_id.ar}</p>}
            </div>)
          }
          {/*Name*/}
          <Input
            name={"name"}
            type={"text"}
            value={driver.name}
            label={lang === "en" ? "Name" : "الإسم"}
            error={errors.name}
            handleChange={handleInputChange}
          />

          <Input
            name={"phone"}
            type={"text"}
            value={driver.phone}
            label={lang === "en" ? "Phone" : "رقم التليفون"}
            handleChange={handleInputChange}
          />

          <Input
            name={"address"}
            type={"text"}
            value={driver.address}
            label={lang === "en" ? "Address" : "العنوان"}
            handleChange={handleInputChange}
          />

          <Input
            name={"license"}
            type={"text"}
            value={driver.license}
            label={lang === "en" ? "Driving License" : "رقم رخصه القيادة"}
            error={errors.license}
            handleChange={handleInputChange}
          />

          <Input
            name={"national_id"}
            type={"text"}
            value={driver.national_id}
            label={lang === "en" ? "National ID" : "الرقم القومي"}
            error={errors.national_id}
            handleChange={handleInputChange}
          />

          {/* Submit */}
          {/*<Row className="mb-3">*/}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <button
              className={"btn btn-success"}
              onClick={save}
            >{lang === "en" ? "Save" : "حفظ"}
            </button>

          </div>
          {/*</Row>*/}

        </CardBody>
      </Card>
    </div>

  )
}

export default Driver
