import { useSelector } from "react-redux"
import Joi from "joi-browser"
import Avatar from 'react-avatar-edit'
import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import http from "../../services/httpServices"
import * as URL from "../../helpers/url_helper"
import Input from "../../common/elements/input"
import Select from "../../common/elements/Select"
import maleImg from '../../assets/images/photos/male.png'
import femaleImg from '../../assets/images/photos/female.png'

const User = props => {

  const roles = [
    { en: "Select", ar: "اخترالصلاحيه" },
    { en: "System Admin", ar: "مدير النظام" },
    { en: "Account Manager", ar: "مسؤول شركه" },
    { en: "Group Manager", ar: "مسؤول فرع" },
    { en: "Group Viewer", ar: "ملاحظ فرع" }
  ]
  const errorMessages = {
    user_name: {
      ar: "إسم المستخدم يجب ان يكون على الاقل ٥ احرف و على الاكثر ٢٠ حرفا",
      en: "Username must be at min 5 char s and max 20 max"
    },
    server: {
      ar: "البريد الاليكتروني مستخدم من قبل مستخدم اخر",
      en: "Email Already exists"
    },
    email: { ar: "يجب ادخال بريد الكتروني صحيح", en: "Please enter valid E-Mail" },
    password: {
      ar: "كلمه المرور لا يجب ان تقل عن ٦ احرف او تزيد عن ٢٠ حرفا",
      en: "Please enter password min 6 chars and max 20 chars"
    },
    role: { ar: "يجب اختيار صلاحيه", en: "Please select a role" },
    account: { ar: "يجب اختيار شركه", en: "Please Select a company" },
    group: { ar: "يجب اختيار فرع", en: "Please Select a group" }

  }
  const data = props.location.state
  const lang = useSelector(state => state.Login.lang)
  const [accounts, setAccounts] = useState([{ id: 0, name: "--" }])
  const [groups, setGroups] = useState([{ id: 0, name: "--" }])
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    user_name: "",
    email: "",
    password: "",
    role: 0,
    account: 0,
    group: 0
  })
  const [errors, setErrors] = useState({
    use_name: false,
    email: false,
    password: false,
    role: false,
    account: false,
    group: false,
    server: false
  })
  const isEdit = !!data

  const schema = {
    id: Joi.any().optional(),
    user_name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20),
    role: Joi.number().min(1).required(),
    account: Joi.number().min(1).optional(),
    group: Joi.number().min(1).optional()
  }

  const validate = (userData) => {
    let x = {
      use_name: false,
      email: false,
      password: false,
      role: false,
      account: false,
      group: false
    }
    const res = Joi.validate(userData, schema, { abortEarly: false });
    if(res.error){
      const _errors = res.error.details
      const errorsSet = new Set()
      _errors.map(e => errorsSet.add(e.path[0]))
      for (let e of errorsSet) {
        x = { ...x, [e]: true }
      }
    return true;
    }
    setErrors(x);
    return false;
  }

  const handleAccountChange = async (id) => {
    try {
      setSelectedUser({ ...selectedUser, account: id })
      const { data } = await http.get(`${URL.GET_GroupsByAccount}/${id}`)
      setGroups([{ id: 0, name: "--" }, ...data])
    } catch (e) {

    }
  }

  useEffect(async () => {
    if (data) {
      setSelectedUser({
        id: data.id,
        user_name: data.user_name,
        email: data.email,
        password: "",
        role: parseInt(data.role_id),
        account: parseInt(data.account_id),
        group: parseInt(data.group_id)
      })
    }
    try {
      const res= await http.get(URL.GET_Accounts)
      setAccounts([{ id: 0, name: "--" }, ...res.data])
      if (selectedUser.account !== 0 && selectedUser.role === 2) {
        await handleAccountChange(selectedUser.account)
      }
    } catch (e) {
    }
  }, [])

  const save = async() => {
    const user = { ...selectedUser }
    if (isEdit) {
      delete user.password
    }
    switch (user.role) {
      case 1:
        delete user.account
        delete user.group
        break
      case 2:
        delete user.group
        break
      default:
        break
    }
    if(validate(user)) return;
    if(!isEdit){ // add new user
      user.email = user.email.toLowerCase();
      try{
         await http.post(URL.POST_creatUser, user);
        props.history.push('/users')
      }catch (e){
        return setErrors({...errors, server: true});
      }

    }
    else{  // update user
      try{
        await http.put(URL.PUT_updateUser, user);
        props.history.push('/users')
      }catch (e){
        console.log(e);
      }
    }
  }

  const remove = async() => {
    await http.delete(`${URL.DELETE_user}/${selectedUser.id}`);
    props.history.push('/users');
  }

  const changePassword = () => {
    if(!selectedUser.password || selectedUser.password.length<6 || selectedUser.password>20){
      setErrors({...errors, password: true});
      return
    }
    http.patch(URL.Patch_changePassword, {user_id: selectedUser.id, password: selectedUser.password});
  }

  const handleInputChange = ({ name, value }) => {
    setSelectedUser({ ...selectedUser, [name]: value })
    if (name === "account") handleAccountChange(value)
  }
console.log(accounts)
  return (
    <div className={"page-content"}>
      <Card>
        <CardBody>
          {
            (errors.user_name || errors.email ||
              errors.password || errors.role ||
              errors.account || errors.group
            || errors.server) &&
            (<div className={"alert alert-danger"}>
              {errors.user_name && <p> {lang === "en" ? errorMessages.user_name.en : errorMessages.user_name.ar} </p>}
              {errors.server && <p> {lang === "en" ? errorMessages.server.en : errorMessages.server.ar} </p>}
              {errors.email && <p>{lang === "en" ? errorMessages.email.en : errorMessages.email.ar}</p>}
              {errors.password && <p>{lang === "en" ? errorMessages.password.en : errorMessages.password.ar}</p>}
              {errors.account && <p>{lang === "en" ? errorMessages.account.en : errorMessages.account.ar}</p>}
              {errors.group && <p>{lang === "en" ? errorMessages.group.en : errorMessages.group.ar}</p>}
            </div>)
          }

          {/* Name */}
          <Row className="mb-3">
            <Input
              name={"user_name"}
              type={"text"}
              value={selectedUser.user_name}
              label={lang === "en" ? "Name" : "الاسم"}
              error={errors.user_name}
              handleChange={handleInputChange}
            />
          </Row>

          {/* E-Mail */}
          <Row className="mb-3">
            <Input
              name={"email"}
              type={"email"}
              value={selectedUser.email}
              label={lang === "en" ? "E-Mail" : "البريد الالكتروني"}
              error={errors.email}
              disabled={isEdit}
              handleChange={handleInputChange}
            />
          </Row>

          {/* Password */}
          <Row className="mb-3">
            <Input
              name={"password"}
              type={"text"}
              value={selectedUser.password}
              label={lang === "en" ? "Password" : "كلمه المرور"}
              error={errors.password}
              handleChange={handleInputChange}
            />
            {isEdit && (
              <button
                className={"btn btn-danger btn-block col-md-12"}
                onClick={changePassword}
              >{lang === "en" ? "Change Password" : "تغيير كلمه المرور"}</button>
            )}
          </Row>

          {/* Role */}
          <Row className="mb-3">
            <Row className="mb-3">
              <label className="col-md-2 col-form-label">
                {lang === "en" ? "Role" : "الصلاحيات"}
              </label>
              <div className="col-md-9">
                <select
                  className={errors.role ? "form-control alert-danger" : "form-control"}
                  value={selectedUser.role}
                  name={"role"}
                  onChange={(e) => {
                    setSelectedUser({ ...selectedUser, role: parseInt(e.target.value) })
                  }}
                >
                  {roles.map((role, index) => {
                    return (
                      <option key={index} value={index}>{roles[index][lang]}</option>
                    )
                  })}

                </select>
              </div>
            </Row>
          </Row>

          {/* Account */}
          <Row className="mb-3">
            <Select
              label={lang === "en" ? "Account" : "الشركة"}
              value={selectedUser.account}
              name={"account"}
              disabled={selectedUser.role === 1}
              options={accounts}
              error={errors.account}
              elem={'account'}
              handleChange={handleInputChange}
            />
          </Row>

          {/* Group */}
          <Row className="mb-3">
            <Select
              label={lang === "en" ? "Group" : "الفرع"}
              value={selectedUser.group}
              name={"group"}
              disabled={selectedUser.role === 1 || selectedUser.role === 2}
              options={groups}
              error={errors.group}
              elem={'name'}
              handleChange={handleInputChange}
            />
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

export default User