import { useSelector, useDispatch } from "react-redux"
import { Fab } from "@material-ui/core"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import DatatableTables from "../../components/Common/tables/DatatableTables"
import Account from "../accounts/account"
import { useEffect, useState } from "react"
import http from "../../services/httpServices"
import { GET_GroupsByAccount, DELETE_removeGroup } from "../../helpers/url_helper"
import { setGroup } from "../../store/selections/reducer"

const Groups = (props) => {
  const dispatch = useDispatch()
  const lang = useSelector(state => state.Login.lang)
  const user = useSelector(state => state.Login.user)
  const [groups, setGroups] = useState([])
  const selectedAccount = useSelector(state => state.selections.account)//props.location.state
  const [selectedGroups, setSelectedGroups] = useState([])
  if (!selectedAccount) props.history.replace("/accounts")
  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true
    },
    {
      dataField: "name",
      text: lang === "en" ? "Group" : "الفرع",
      sort: true
    },
    {
      dataField: "address",
      text: lang === "en" ? "Address" : "العنوان",
      sort: true
    },
    {
      dataField: "contact_person",
      text: lang === "en" ? "Contact Person" : "إسم المسؤول",
      sort: true
    },
    {
      dataField: "contact_phone",
      text: lang === "en" ? "Contact phone" : "رقم تليفون المسؤول"
    }
  ]

  const selectGroup = (group) => {
    dispatch(setGroup(group))
    localStorage.setItem("group", JSON.stringify(group))
    props.history.push({ pathname: "/group", state: group })
  }

  const handleSelect = (group, isSelect) => {
    if(isSelect){
      setSelectedGroups([...selectedGroups, group])
    }else{
      const grps = selectedGroups.filter(g => g.id !== group.id)
      setSelectedGroups(grps)
    }
  }
  const handleSelectAll = (isSelect) => {
    if(isSelect)setSelectedGroups(groups);
    else setSelectedGroups([])
    console.log(selectedGroups)

  }
  const removeSelected = async () => {
    let ids = []
    selectedGroups.map(g => ids.push(g.id))
    await http.post(DELETE_removeGroup, { ids });
    await loadGroups();
  }

  const addNew = () => {
    props.history.push({ pathname: "/group", state: selectedAccount.id })
  }

  const loadGroups = async () => {
    const { data } = await http.get(`${GET_GroupsByAccount}/${selectedAccount.id}`)
    setGroups(data)
  }
  useEffect(async () => {
    await loadGroups();
  }, [])
  return (
    <div className={"page-content"}>
      <div className={"alert alert-dark"} style={{ textAlign: "center" }}>
        <h3> {selectedAccount.account} </h3>
      </div>
      {(user.role_id === 1) && (<div>
        <Account data={selectedAccount} history={props.history} />
      </div>)}
      <div>


        <DatatableTables
          columns={columns}
          data={groups}
          selectDevice={selectGroup}
          handleSelection={handleSelect}
          deleteBtn={(!selectedGroups.length > 0)&&(user.role_id===1)}
          handleSelectAll={handleSelectAll}
          removeSelected={removeSelected}
        />
        {user.role_id === 1 && (
          <Fab color="primary" aria-label="add" onClick={addNew}>
            <AddIcon style={{ color: "white" }} />
          </Fab>
        )}
      </div>

    </div>

  )
}

export default Groups