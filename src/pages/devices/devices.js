import DatatableTables from "../../components/Common/tables/DatatableTables"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import { DELETE_RemoveDevice, DELETE_user, GET_AllUsers } from "../../helpers/url_helper"

const Devices = (props) => {

  const lang = useSelector(state => state.Login.lang)
  const [devices, setDevices] = useState([])
  const [selectedDevices, setSelectedDevices] = useState([])

  const columns = [
    {
      dataField: "imei",
      text: lang === "en" ? "Imei" : "الرقم المسلسل",
      sort: true
    },
    {
      dataField: "type",
      text: lang === "en" ? "Type" : "نوع الجهاز",
      sort: true
    },
    {
      dataField: "subscription",
      text: lang === "en" ? "Subscription" : "تاريخ انتهاء الاشتراك",
      sort: true
    },
    {
      dataField: "phone",
      text: lang === "en" ? "Phone" : "رقم الشريحه",
      sort: true
    }
  ]

  const selectDevice = (device) => {
    props.history.push({ pathname: "/device", state: device })
  }

  const handleSelect = (device, isSelect) => {
    if (isSelect) {
      setSelectedDevices([...selectedDevices, device])
    } else {
      const dvs = selectedDevices.filter(g => g.id !== group.id)
      setSelectedDevices(dvs)
    }
  }
  const handleSelectAll = (isSelect) => {
    if (isSelect) setSelectedDevices(devices)
    else setSelectedDevices([])
  }
  const removeSelected = async () => {
    let ids = []
    selectedDevices.map(g => ids.push(g.id))
    await http.post(DELETE_RemoveDevice, { ids })
    await loadDevices()
  }

  const loadDevices = async () => {
    const { data } = await http.get(URL.GET_devices)
    if (data.length > 0) {
      data.map((d, i) => {
        data[i].subscription = d.subscription.split("T")[0]
      })
    }
    setDevices(data)
  }

  useEffect(async () => {
    await loadDevices()
  }, [])
  return (
    <div className={"page-content"}>
      <div className={"alert alert-dark"} style={{ textAlign: "center" }}>
        <h3>Devices</h3>
      </div>

      <DatatableTables
        columns={columns}
        data={devices}
        selectDevice={selectDevice}
        handleSelection={handleSelect}
        deleteBtn={(!selectedDevices.length > 0)}
        handleSelectAll={handleSelectAll}
        removeSelected={removeSelected}
      />

      <Fab color="primary" aria-label="add">
        <Link to={"/device"}>
          <AddIcon style={{ color: "white" }} />
        </Link>
      </Fab>
    </div>

  )
}

export default Devices