import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane
} from "reactstrap"

import classnames from "classnames"
import http from "../../services/httpServices"
import {
  GET_Accounts,
  GET_GroupsByAccount,
  paths as GET_paths,
  POST_CreateCar,
  GET_freeDevices,
  GET_ById,
  GET_getGroupById,
  GET_AccountById
}
  from "../../helpers/url_helper"

import { useSelector } from "react-redux"

const CarForm = props => {
  const user = useSelector(state => state.Login.user)
  const lang = useSelector(state => state.Login.lang)
  const car = props.location.state
  const isEdit = !!car
  const [activeTab, setactiveTab] = useState(1)
  const [info, setInfo] = useState({
    account_id: 0,
    group_id: 0,
    imei: "--",
    name: "",
    plate_number: "",
    vin_number: "",
    engine_number: "",
    fuel_rate: 0,
    color: "",
    tank_size: 0,
    path: "",
    installed_by: "",
    //installation_time: null,
    installation_company: "",
    installation_location: "",
    //last_maintenance_time: null,
    //last_maintenance_odometer: null,
    //next_maintenance_time: null,
    //next_maintenance_odometer: null,
    engine_on: false,
    engine_off: false,
    door_open: false,
    door_closed: false,
    speed_alert: false,
    speed_limit: 100
  })
  const [activeTabVartical, setoggleTabVertical] = useState(1)
  const [accounts, setAccounts] = useState([])
  const [groups, setGroups] = useState([{ id: 0, name: "--" }])
  const [paths, setPaths] = useState([{ id: 0, name: "--" }])
  const [selectedAccount, setSelectedAccount] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState(0)
  const [selectPath, setSelectedPath] = useState(0)
  const [devices, setDevices] = useState([{ imei: "--" }])
  const [errors, setErrors] = useState({
    account: false,
    group: false,
    tank: false,
    imei: false,
    name: false,
    plate_number: false
  })
  const errorMessages = {
    account: { en: "Please Select Account", ar: "من فضلك اختر شركه" },
    group: { en: "Please Select Group", ar: "من فضلك اختر فرع" },
    tank: { en: "Please Enter Tank Size", ar: "من فضلك ادخل حجم خزان الوقود" },
    imei: { en: "Please Select Device", ar: "من فضلك اختر رقم جهاز التتبع" },
    name: { en: "Please Enter a Name for the car", ar: "من فضلك ادخل اسم السيارة" },
    plate_number: { en: "Please Enter car Plate", ar: "من فضلك ادخل رقم اللوحات المعدنيه" }
  }

  const handleInput = ({ name, value }) => {
    console.log(name, value)
    setInfo({ ...info, [name]: value })
  }

  const handleAccountChange = async (id) => {
    //setSelectedAccount(id)
    if (id === 0) {
      setGroups([{ id: 0, name: "--" }])
      setPaths([{ id: 0, name: "--" }])
      return
    }
    const { data } = await http.get(GET_GroupsByAccount + "/" + id)
    setGroups([{ id: 0, name: "--" }, ...data])
    setInfo({ ...info, account_id: parseInt(id), group_id: 0 })
  }

  const handleGroupChange = async (id) => {
    // setSelectedGroup(id)
    setInfo({ ...info, group_id: parseInt(id) })
    if (id > 0) {
      const { data } = await http.get(GET_paths + "/" + id)
      setPaths([{ id: 0, name: "--" }, ...data])
      const res = await http.get(GET_freeDevices + "/" + id)
      setDevices([{ imei: "--" }, ...res.data])
    }
  }

  const validateMainInfo = () => {
    let valRes = true
    let e = errors
    // account selected
    if (info.account_id === 0) {
      e = { ...e, account: true }
      valRes = false
    } else {
      e = { ...e, account: false }
    }
    // group selected
    if (info.group_id === 0) {
      e = { ...e, group: true }
      valRes = false
    } else {
      e = { ...e, group: false }
    }
    // there is a value for tank size
    if (info.tank_size === 0) {
      e = { ...e, tank: true }
      valRes = false
    } else {
      e = { ...e, tank: false }
    }
    // IMEI is empty,
    if (info.imei === "--") {
      e = { ...e, imei: true }
      valRes = false
    } else {
      e = { ...e, imei: false }
    }
    // name
    if (info.name === "") {
      e = { ...e, name: true }
      valRes = false
    } else {
      e = { ...e, name: false }
    }
    // plate number
    if (info.plate_number === "") {
      e = { ...e, plate_number: true }
      valRes = false
    } else {
      e = { ...e, plate_number: false }
    }
    setErrors(e)
    return valRes

  }

  const changeActiveTab = (tab) => {
    setactiveTab(tab)

  }

  useEffect(async () => {
    if (isEdit) {
      // fetch car data
      const { data: _car } = await http.get(`${GET_ById}/${car.id}`)

      // fetch car group
      const { data: group } = await http.get(`${GET_getGroupById}/${_car.group_id}`)

      // fetch all accounts
      const { data: accounts } = await http.get(GET_Accounts)
      setAccounts(accounts)

      // fetch car account
      const { data: account } = await http.get(`${GET_AccountById}/${group.account_id}`)
      setAccounts([account])

      // get all groups for that account
      const { data: groups } = await http.get(GET_GroupsByAccount + "/" + account.id)
      setGroups(groups)

      // get devices
      const { data: devices } = await http.get(GET_freeDevices + "/" + _car.group_id)
      setDevices([{ imei: _car.imei }, ...devices])

      // get paths
      const { data: paths } = await http.get(GET_paths + "/" + _car.group_id)
      setPaths([{ id: 0, name: "--" }, ...paths])

      car.account_id = account.id
      //setInfo({ ...info, account_id: parseInt(id), group_id: 0 })

      // set data on the screen

      try {
        _car.installation_time = _car.installation_time.split("T")[0]
        _car.last_maintenance_time = _car.last_maintenance_time.split("T")[0]
        _car.next_maintenance_time = _car.next_maintenance_time.split("T")[0]
      } catch (e) {
      }
      setInfo(_car)
    } else {
      const { data } = await http.get(GET_Accounts)
      setAccounts([{ id: 0, account: "--" }, ...data])
    }

  }, [])

  const saveCar = async () => {
    const valRes = validateMainInfo()
    if (!valRes)
      return

    const car = { ...info }
    delete car.account_id
    try {
      car.installation_time = car.installation_time.split("T")[0]
      car.last_maintenance_time = car.last_maintenance_time.split("T")[0]
      car.next_maintenance_time = car.next_maintenance_time.split("T")[0]
    } catch (e) {
    }

    if (!isEdit) {
      await http.post("cars", car)
    } else {
      await http.put("cars", car)
    }
    props.history.push('/cars')
  }

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
      }
    }
  }

  return (
    <React.Fragment>
      <div className={"page-content"}>
        <MetaTags>
          <title>LimoTrack</title>
        </MetaTags>
        <Container fluid={true}>
          {(errors.account || errors.group || errors.name || errors.imei
            || errors.tank || errors.plate_number) && (<div className={"alert alert-danger"}>
            {errors.account && <h5>{errorMessages.account[lang]}</h5>}
            {errors.group && <h5>{errorMessages.group[lang]}</h5>}
            {errors.name && <h5>{errorMessages.name[lang]}</h5>}
            {errors.imei && <h5>{errorMessages.imei[lang]}</h5>}
            {errors.tank && <h5>{errorMessages.tank[lang]}</h5>}
            {errors.plate_number && <h5>{errorMessages.plate_number[lang]}</h5>}

          </div>)}
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      {/* TABs HEADER*/}
                      <ul>
                        {/* CAR info tab header */}
                        <NavItem className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              changeActiveTab(1)
                            }}
                          >
                            <span className="number">01</span>{" "}
                            {lang === "en" ? "Car Info" : "بيانات السياره"}
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              changeActiveTab(2)
                            }}
                          >
                            <span className="number ms-2">02</span>{" "}
                            {lang === "en" ? "Car installation" : "بيانات التركيب"}
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 3 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              changeActiveTab(3)
                            }}
                          >
                            <span className="number">03</span>{" "}
                            {lang === "en" ? "Maintenance" : "بيانات الصيانه"}

                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 4 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              changeActiveTab(4)
                            }}
                          >
                            <span className="number">04</span>{" "}
                            {lang === "en" ? "Alerts" : "الاشعارات"}
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 5 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 5 })}
                            onClick={() => {
                              changeActiveTab(5)
                            }}
                          >
                            <span className="number">05</span>{" "}
                            {lang === "en" ? "Finish" : "إنهاء"}

                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    {/*TABS body*/}
                    <div className="content clearfix mt-4">

                      <TabContent activeTab={activeTab}>
                        {/* INFO  */}
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label>{lang === "en" ? "Account" : "الشركه"}<span
                                    style={{ color: "red" }}>*</span></Label>
                                  <select
                                    className={!errors.account ? "form-select alert-success" : "form-select alert-danger"}
                                    disabled={user.role_id !== 1}
                                    name={"account_id"}
                                    value={info.account_id}
                                    onChange={(e) => handleAccountChange(e.target.value)}

                                  >
                                    {accounts.map(account => {
                                      return (
                                        <option key={account.id} value={account.id}>{account.account}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label>{lang === "en" ? "Group" : "الفرع"}<span
                                    style={{ color: "red" }}>*</span></Label>
                                  <select
                                    className={!errors.group ? "form-select alert-success" : "form-select alert-danger"}
                                    disabled={user.role_id !== 1}
                                    name={"group_id"}
                                    value={info.group_id}
                                    onChange={(e) => {
                                      handleGroupChange(e.target.value)
                                    }}
                                  >
                                    {groups.map(group => {
                                      return (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "IMEI" : "الرقم المسلسل لجهاز التتبع"}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <select
                                    className={!errors.imei ? "form-select alert-success" : "form-select alert-danger"}
                                    disabled={user.role_id !== 1}
                                    name={"imei"}
                                    value={info.imei}
                                    onChange={(e) => handleInput(e.target)}
                                  >
                                    {devices.map((device, index) => {
                                      return (
                                        <option key={index} value={device.imei}>{device.imei}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Name" : "الاسم"}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    className={!errors.name ? "form-input alert-success" : "form-input alert-danger"}
                                    disabled={user.role_id !== 1}
                                    id="basicpill-lastname-input2"
                                    value={info.name}
                                    name={"name"}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Plate Number" : "رقم اللوحات"}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    className={!errors.plate_number ? "form-input alert-success" : "form-input alert-danger"}
                                    disabled={user.role_id !== 1}
                                    id="basicpill-firstname-input1"
                                    name={"plate_number"}
                                    value={info.plate_number}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Vin Code" : "رقم الشاسيه"}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name={"vin_number"}
                                    value={info.vin_number}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Engine Code" : "رقم المحرك"}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"engine_number"}
                                    value={info.engine_number}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Fuel Consumption Rate (L/Km)" : "معدل إستهلاك الوقود (لتر/كم)"}
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name={"fuel_rate"}
                                    value={info.fuel_rate}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Car Path" : "مسار السياره"}
                                  </Label>
                                  <select
                                    className="form-select"
                                    name={"path_id"}
                                    value={info.path_id}
                                    onChange={(e) => {
                                      handleInput(e.target)
                                      // setInfo({ ...info, path: parseInt(e.target.value) })
                                    }}
                                  >
                                    {paths.map(path => {
                                      return (
                                        <option key={path.id} value={path.id}>{path.name}</option>
                                      )
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Tank Size (Litre)" : "حجم خزان الوقود (لتر)"}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <Input
                                    type="number"
                                    className={!errors.tank ? "form-control alert-success" : "form-control alert-danger"}
                                    disabled={user.role_id !== 1}
                                    id="basicpill-lastname-input2"
                                    name={"tank_size"}
                                    value={info.tank_size}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Color" : "اللون"}
                                  </Label>
                                  <Input
                                    type="color"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"color"}
                                    value={info.color}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>

                          </Form>
                        </TabPane>

                        {/* Installation */}
                        <TabPane tabId={2}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Installation Company" : "شركه التركيب"}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"installation_company"}
                                    value={info.installation_company}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Installed By" : "اسم فني التركيب"}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name={"installed_by"}
                                    value={info.installed_by}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Installation Time" : "وقت التركيب"}
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    value={info.installation_time}
                                    name={"installation_time"}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Location of Installation" : "مكان التركيب"}
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    value={info.installation_location}
                                    name={"installation_location"}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>

                            </Row>
                          </Form>
                        </TabPane>

                        {/* Maintenance */}
                        <TabPane tabId={3}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Last Maintenance Date" : "تاريخ اخر صيانه"}
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"last_maintenance_time"}
                                    value={info.last_maintenance_time}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Last Maintenance Odometer" : "قراءه عداد اخر صيانه"}
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name={"last_maintenance_odometer"}
                                    value={info.last_maintenance_odometer}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Next Maintenance Date" : "تاريخ الصيانه التاليه"}
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"next_maintenance_time"}
                                    value={info.next_maintenance_time}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    {lang === "en" ? "Next Maintenance Odometer" : "قراءه عداد الصيانه التاليه"}
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="basicpill-lastname-input2"
                                    name={"next_maintenance_odometer"}
                                    value={info.next_maintenance_odometer}
                                    onChange={(e) => handleInput(e.target)}
                                  />
                                </div>
                              </Col>
                            </Row>

                          </Form>
                        </TabPane>

                        {/* Alerts */}
                        <TabPane tabId={4}>
                          <Form>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Engine ON" : "تشغيل المحرك"}
                                  </Label>
                                  <Input
                                    type="checkbox"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"engine_on"}
                                    checked={info.engine_on}
                                    onChange={(e) =>
                                      handleInput({ name: e.target.name, value: e.target.checked })
                                    }
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Engine OFF" : "إيقاف المحرك"}
                                  </Label>
                                  <Input
                                    type="checkbox"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"engine_off"}
                                    checked={info.engine_off}
                                    onChange={(e) =>
                                      handleInput({ name: e.target.name, value: e.target.checked })
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Door Open" : "فتح الابواب"}
                                  </Label>
                                  <Input
                                    type="checkbox"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"door_open"}
                                    checked={info.door_open}
                                    onChange={(e) =>
                                      handleInput({ name: e.target.name, value: e.target.checked })
                                    }
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Door closed" : "غلق الابواب"}
                                  </Label>
                                  <Input
                                    type="checkbox"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"door_closed"}
                                    checked={info.door_closed}
                                    onChange={(e) =>
                                      handleInput({ name: e.target.name, value: e.target.checked })
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Speed Alert" : "السرعه الزائدة"}
                                  </Label>
                                  <Input
                                    type="checkbox"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    name={"speed_alert"}
                                    checked={info.speed_alert}
                                    onChange={(e) =>
                                      handleInput({ name: e.target.name, value: e.target.checked })
                                    }
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    {lang === "en" ? "Speed Limit" : "حد السرعة"}
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    disabled={!info.speed_alert}
                                    name={"speed_limit"}
                                    value={info.speed_limit}
                                    onChange={(e) => handleInput(e.target)}

                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>

                      </TabContent>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <button  className={'btn btn-success'} onClick={() => {
            saveCar()
          }}>{lang==='en'? 'Save': 'حفظ'}
          </button>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CarForm
