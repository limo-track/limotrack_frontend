import { useSelector } from "react-redux"
import DatatableTables from "../../components/Common/tables/DatatableTables"
import { Fab } from "@material-ui/core"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import { useEffect, useState } from "react"
import http from "../../services/httpServices"
import { DELETE_user, GET_AllUsers } from "../../helpers/url_helper"

const Users = (props) => {
  const lang = useSelector(state => state.Login.lang)
  const user = useSelector(state => state.Login.user)
  const [data, setData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const columns = [
    {
      dataField: "user_name",
      text: lang === "en" ? "Name" : "الاسم",
      sort: true
    },
    {
      dataField: "email",
      text: lang === "en" ? "E-Mail" : "البريد الالكتروني",
      sort: true
    },
    {
      dataField: "role",
      text: lang === "en" ? "Role" : "الصلاحيات"
    },
    {
      dataField: "account",
      text: lang === "en" ? "Account" : "الشركه"
    },
    {
      dataField: "group",
      text: lang === "en" ? "Group" : "الفرع"
    }
  ]

  const handleSelect = (user, isSelect) => {
    if (isSelect) {
      setSelectedUsers([...selectedUsers, user])
    } else {
      const usrs = selectedUsers.filter(g => g.id !== group.id)
      setSelectedUsers(usrs)
    }
  }
  const handleSelectAll = (isSelect) => {
    if (isSelect) setSelectedUsers(data)
    else setSelectedUsers([])
  }
  const removeSelected = async () => {
    let ids = []
    selectedUsers.map(g => ids.push(g.id))
    await http.post(DELETE_user, { ids })
    await loadUsers()
  }

  const loadUsers = async () => {
    const res = await http.get(`${GET_AllUsers}/${user.id}`)
    setData(res.data)
  }

  useEffect(async () => {
    try {
      await loadUsers()
    } catch (e) {

    }
  }, [])

  const selectDevice = (user) => {
    props.history.push({ pathname: "/user", state: user })
  }
  return (
    <div className={"page-content"}>

      <DatatableTables
        columns={columns}
        data={data}
        selectDevice={selectDevice}
        handleSelection={handleSelect}
        deleteBtn={(!selectedUsers.length > 0)&&(user.role_id===1)}
        handleSelectAll={handleSelectAll}
        removeSelected={removeSelected}
      />

      <Fab color="primary" aria-label="add">
        <Link to={"/user"}>
          <AddIcon style={{ color: "white" }} />
        </Link>
      </Fab>
    </div>
  )
}

export default Users