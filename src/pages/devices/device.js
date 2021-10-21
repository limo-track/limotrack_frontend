import { Card, CardBody, Col, Row } from "reactstrap"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import Input from "../../common/elements/input"
import Joi from 'joi-browser';

const Device = props => {

  const errorMessages = {
    imei: {
      ar: "الرقم المسلسل الذي تم إدخاله غير صحيح",
      en: "Invalid IMEI"
    },
    phone: { ar: "يجب ادخال رقم تليفون", en: "Please enter phone number" },
    subscription: {
      ar: "يجب إدخال تاريخ انتهاء للاشتراك",
      en: "Please enter subscription end date"
    },
    type: { ar: "يجب اختيار نوع الجهاز", en: "Please select a type" },
    server: { ar: "الرقم المسلسل موجود بالفعل", en: "IMEI already exists" }

  }
  const data = props.location.state
  const isEdit = !!data;
  const lang = useSelector(state => state.Login.lang)
  const [types, setTypes] = useState([])
  const [device, setDevice] = useState({
    imei: "",
    phone: "",
    subscription: "",
    device_type_id: 0
  })
  const [errors, setErrors] = useState({
    imei: false,
    phone: false,
    subscription: false,
    type: false,
    server: false
  })

  const schema = {
    id: Joi.any().optional(),
    imei: Joi.string().min(15).max(15).required(),
    phone: Joi.string().min(11).max(20).required(),
    subscription: Joi.date().required(),
    device_type_id: Joi.number().min(1).required(),
  }

  const validate = (d) => {
    console.log(d);
    let x = {
      imei: false,
      phone: false,
      subscript: false,
      type: false,
      server: false
    }
    const res = Joi.validate(d, schema, { abortEarly: false });
    if(res.error){
      console.log(res.error)
      const _errors = res.error.details
      const errorsSet = new Set()
      _errors.map(e => errorsSet.add(e.path[0]))
      for (let e of errorsSet) {
        x = { ...x, [e]: true }
      }
      setErrors(x);
      return true;
    }
    return false;
  }

  useEffect(async () => {
    if (data) {
      delete data.type
      setDevice(data)
    }
    console.log(data)
    const res = await http.get(URL.GET_deviceTypes)
    setTypes([{ id: 0, type: "--" }, ...res.data])
  }, []);

  const save = async () => {
    const validationResult = validate(device);

    if(validationResult) return

    setErrors({
      imei: false,
      phone: false,
      subscription: false,
      type: false,
      server: false
    })

    if (!isEdit) {
      try{
        await http.post(URL.POST_createDevice, device)
      }catch (e){
        return setErrors({...errors, server: true})
      }

    } else {
      await http.put(URL.PUT_updateDevice, device)
    }
    props.history.push("/devices")
  }

  const remove = async () => {
    await http.delete(`${URL.DELETE_RemoveDevice}/${device.imei}`)
    props.history.push("/devices")
  }

  const handleInputChange = ({ name, value }) => {
    if(name==='device_type_id') value = parseInt(value);
    setDevice({ ...device, [name]: value })
  }

  return (
    <div className={"page-content"}>
      <Card>
        <CardBody>
          {
            (errors.imei || errors.phone || errors.subscription || errors.type || errors.server) &&
            (<div className={"alert alert-danger"}>
              {errors.imei && <p> {lang === "en" ? errorMessages.imei.en : errorMessages.imei.ar} </p>}
              {errors.server && <p>{lang === "en" ? errorMessages.server.en : errorMessages.server.ar}</p>}
              {errors.phone && <p>{lang === "en" ? errorMessages.phone.en : errorMessages.phone.ar}</p>}
              {errors.subscription && <p>{lang === "en" ? errorMessages.subscription.en : errorMessages.subscription.ar}</p>}
              {errors.type && <p>{lang === "en" ? errorMessages.type.en : errorMessages.type.ar}</p>}
            </div>)
          }
          <Input
            name={"imei"}
            type={"text"}
            value={device.imei}
            label={lang === "en" ? "IMEI" : "الرقم المسلسل"}
            error={errors.imei}
            handleChange={handleInputChange}
            disabled={isEdit}
          />

          <Input
            name={"phone"}
            type={"text"}
            value={device.phone}
            label={lang === "en" ? "Phone" : "رقم الشريحه"}
            error={errors.phone}
            handleChange={handleInputChange}
          />

          <Input
            name={"subscription"}
            type={"date"}
            value={device.subscription}
            label={lang === "en" ? "Subscription" : "تاريخ انتهاء الاشتراك"}
            error={errors.subscription}
            handleChange={handleInputChange}
          />


          <Row className="mb-3">
            <label className="col-md-2 col-form-label">
              {lang === "en" ? "Type" : "نوع الجهاز"}
            </label>
            <div className="col-md-9">
              <select
                className={errors.type ? "form-control alert-danger" : "form-control"}
                value={device.device_type_id}
                name={"device_type_id"}
                disabled={isEdit}
                onChange={(e) => handleInputChange(e.target)}
              >
                {types.map((type, i) => {
                  return (
                    <option key={type.id} value={parseInt(type.id)}> {type.type} </option>
                  )
                })}

              </select>
            </div>
          </Row>

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

export default Device
