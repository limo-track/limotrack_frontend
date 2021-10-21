import { useSelector, useDispatch } from "react-redux"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DatatableTables from "../../components/Common/tables/DatatableTables"
import { useEffect, useState } from "react"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import { DELETE_drivers } from "../../helpers/url_helper"

const Drivers = (props) => {
  const dispatch = useDispatch()
  const lang = useSelector(state => state.Login.lang)
  const user = useSelector(state => state.Login.user)
  const group_id = useSelector(state=>state.selections.group.id)

  const [drivers, setDrivers] = useState([])
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  const columns = [

    {
      dataField: "name",
      text: lang === "en" ? "Name" : "الإسم",
      sort: true
    },
    {
      dataField: "phone",
      text: lang === "en" ? "Phone" : "التليفون"
    },
    {
      dataField: "address",
      text: lang === "en" ? "Address" : "العنوان"
    },
    {
      dataField: "license",
      text: lang === "en" ? "License" : "رقم رخصه القياده"
    },
    {
      dataField: "national_id",
      text: lang === "en" ? "National ID" : "الرقم القومي"
    },
    {
      dataField: "rating",
      text: lang === "en" ? "Rating" : "التقييم",
      sort: true
    }
  ]

  const selectDriver = (driver) => {
    props.history.push({ pathname: "/driver", state: { group_id, data: driver } })
  }

  const handleSelect = (driver, isSelect) => {
    if(isSelect){
      setSelectedDrivers([...selectedDrivers, driver])
    }else{
      const drivers = selectedDrivers.filter(g => g.id !== driver.id)
      setSelectedDrivers(drivers)
    }
  }

  const handleSelectAll = (isSelect) => {
    if(isSelect)setSelectedDrivers(drivers);
    else setSelectedDrivers([])
  }

  const removeSelected = async () => {
    let ids = []
    selectedDrivers.map(g => ids.push(g.id))
    await http.post(URL.DELETE_drivers, { ids });
    await loadDrivers();
  }

  const addNew = () => {
    props.history.push({ pathname: "/driver", state: { group_id } })
  }

  const loadDrivers = async () => {
    const { data } = await http.get(`${URL.GET_group_drivers}/${group_id}`)
    setDrivers(data)
  }

  useEffect(async () => {
    await loadDrivers();
  }, [])

  return (
    <div className={"page-content"}>
      <div className={"alert alert-dark"} style={{ textAlign: "center" }}>
        <h3> {lang==='en'? 'Drivers':'السائقون'} </h3>
      </div>

      <div>


        <DatatableTables
          columns={columns}
          data={drivers}
          selectDevice={selectDriver}
          handleSelection={handleSelect}
          deleteBtn={(!selectedDrivers.length > 0)&&(user.role_id===1)}
          handleSelectAll={handleSelectAll}
          removeSelected={removeSelected}
        />
        {(user.role_id !== 4) && (
          <Fab color="primary" aria-label="add" onClick={addNew}>
            <AddIcon style={{ color: "white" }} />
          </Fab>
        )}
      </div>

    </div>

  )
}

export default Drivers