import DatatableTables from "../../components/Common/tables/DatatableTables"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import { GET_cars, POST_removeCars } from "../../helpers/url_helper"

const Cars = (props) => {

  const lang = useSelector(state => state.Login.lang);
  const selectedGroup = useSelector(state=>state.selections.group.id)
  const [cars, setCars] = useState([])
  const [selectedCars, setSelectedCars] = useState([])

  const columns = [
    {
      dataField: "name",
      text: lang === "en" ? "Name" : "إسم السياره",
      sort: true
    },
    {
      dataField: "plate_number",
      text: lang === "en" ? "Plate Number" : "رقم اللوحات",
      sort: true
    },
    {
      dataField: "imei",
      text: lang === "en" ? "Imei" : "الرقم المسلسل",
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
    },
    {
      dataField: "path",
      text: lang === "en" ? "Path" : "خط السير",
      sort: true
    }
  ]

  const selectCar = (car) => {
   props.history.push({ pathname: "/cars-dashboard", state: car })
  }

  const handleSelect = (car, isSelect) => {
    if (isSelect) {
      setSelectedCars([...selectedCars, car])
    } else {
      const dvs = selectedCars.filter(g => g.id !== car.id)
      setSelectedCars(dvs)
    }
  }
  const handleSelectAll = (isSelect) => {
    if (isSelect) setSelectedCars(cars)
    else setSelectedCars([])
  }
  const removeSelected = async () => {
    let ids = []
    selectedCars.map(g => ids.push(g.id))
    console.log(ids)
    await http.post(URL.POST_removeCars, { ids })
    await loadCars()
  }

  const loadCars = async () => {
    const { data } = await http.get(`${GET_cars}/${selectedGroup}`)
    if (data.length > 0) {
      data.map((d, i) => {
        data[i].subscription = d.subscription.split("T")[0]
      })
    }
    setCars(data)
  }

  useEffect(async () => {
    await loadCars()
  }, [])
  return (
    <div className={"page-content"}>
      <div className={"alert alert-dark"} style={{ textAlign: "center" }}>
        <h3>{lang==='eng'? 'Cars': 'السيارات'}</h3>
      </div>

      <DatatableTables
        columns={columns}
        data={cars}
        selectDevice={selectCar}
        handleSelection={handleSelect}
        deleteBtn={(!selectedCars.length > 0)}
        handleSelectAll={handleSelectAll}
        removeSelected={removeSelected}
      />

      <Fab color="primary" aria-label="add">
        <Link to={"/carForm"}>
          <AddIcon style={{ color: "white" }} />
        </Link>
      </Fab>
    </div>

  )
}

export default Cars