import { useSelector, useDispatch } from "react-redux"
import { Fab } from "@material-ui/core"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import DatatableTables from "../../components/Common/tables/DatatableTables"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import { useEffect, useState } from "react"
import { setAccount } from "../../store/selections/reducer"
import { DELETE_removeAccount, DELETE_removeGroup } from "../../helpers/url_helper"

const Accounts = (props) => {

  const dispatch = useDispatch()
  const lang = useSelector(state => state.Login.lang)
  const user = useSelector(state => state.Login.user)
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const columns = [
    {
      dataField: "account",
      text: lang === "en" ? "Account" : "إسم الشركه",
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

  useEffect(async () => {
   await loadAccounts()
  }, [])

  const loadAccounts = async () => {
    const { data } = await http.get(URL.GET_Accounts)
    setAccounts(data)
  }

  const selectedAccount = (account) => {
    dispatch(setAccount(account))
    localStorage.setItem("account", JSON.stringify(account))
    props.history.push({ pathname: "/groups", state: account })
  }

  const removeSelected = async () => {
    let ids = []
    selectedAccounts.map(g => ids.push(g.id))
    await http.post(DELETE_removeAccount, { ids })
    await loadAccounts()
  }

  const handleSelect = (account, isSelect) => {
    if (isSelect) {
      setSelectedAccounts([...selectedAccounts, account])
    } else {
      const acc = selectedAccounts.filter(g => g.id !== account.id)
      setSelectedAccounts(acc)
    }
  }

  const handleSelectAll = (isSelect) => {
    if (isSelect) setSelectedAccounts(accounts)
    else setSelectedAccounts([])
  }

  return (
    <div className={"page-content"}>

      <div className={"alert alert-info"} style={{ textAlign: "center" }}>
        <h3>{lang === "en" ? "Accounts" : "الشركات"}</h3>
      </div>

      <DatatableTables
        columns={columns}
        data={accounts}
        selectDevice={selectedAccount}
        handleSelection={handleSelect}
        deleteBtn={(!selectedAccounts.length > 0)&&(user.role_id===1)}
        handleSelectAll={handleSelectAll}
        removeSelected={removeSelected}
      />

      {user.role_id === 1 && (<Fab color="primary" aria-label="add">
        <Link to={"/account"}>
          <AddIcon style={{ color: "white" }} />
        </Link>
      </Fab>)}
    </div>
  )
}

export default Accounts