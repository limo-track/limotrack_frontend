import { Card, CardBody, Col, Row } from "reactstrap"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAccount as setCurrentAccount } from "../../store/selections/reducer"
import Input from "../../common/elements/input"
import http from "../../services/httpServices"
import { POST_createAccount, PUT_updateAccount, DELETE_removeAccount } from "../../helpers/url_helper"

const Account = props => {

  const { data } = props
  const dispatch = useDispatch()
  const lang = useSelector(state => state.Login.lang)
  const isEdit = !!data

  const [account, setAccount] = useState({
    account: "",
    address: "",
    person: "",
    contactPhone: ""
  })

  const [accountError, setAccountError] = useState(false)

  const save = async () => {
    if (!account.account) return setAccountError(true)

    if (isEdit) {
      console.log('account', account)
      await http.put(PUT_updateAccount, {
        id: account.id,
        name: account.account,
        address: account.address,
        contact_person: account.person,
        contact_phone: account.contactPhone
      });

    } else {
      await http.post(POST_createAccount, {
        name: account.account,
        address: account.address,
        contact_person: account.person,
        contact_phone: account.contactPhone
      });
      props.history.replace("/accounts");
    }

  }

  useEffect(() => {
    if (data) {
      setAccount({
        id: data.id,
        account: data.account,
        address: data.address,
        person: data.contact_person,
        contactPhone: data.contact_phone
      })
    }
  }, [])


  const handleInputChange = ({ name, value }) => {
    setAccount({ ...account, [name]: value })
  }

  return (
    <div className={isEdit ? "" : "page-content"}>
      <div>
        <Card>
          <CardBody>
            {
              (accountError) &&
              (<div className={"alert alert-danger"}>Error</div>)
            }
            {/* IMEI */}

            <Input
              name={"account"}
              type={"text"}
              value={account.account}
              label={lang === "en" ? "Account" : "إسم الشركه"}
              error={accountError}
              handleChange={handleInputChange}
            />

            <Input
              name={"address"}
              type={"text"}
              value={account.address}
              label={lang === "en" ? "Address" : "العنوان"}
              handleChange={handleInputChange}
            />

            <Input
              name={"person"}
              type={"text"}
              value={account.person}
              label={lang === "en" ? "Contact Person" : "إسم المسؤول"}
              handleChange={handleInputChange}
            />

            <Input
              name={"contactPhone"}
              type={"text"}
              value={account.contactPhone}
              label={lang === "en" ? "Contact phone" : "رقم تليفون المسؤول"}
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
          </CardBody>
        </Card>

      </div>
    </div>

  )
}

export default Account
