import { Card, CardBody, Col, Row } from "reactstrap"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGroup as setCurrentGroup } from "../../store/selections/reducer"
import Input from "../../common/elements/input"
import * as URL from '../../helpers/url_helper';
import http from "../../services/httpServices"

const Group = props => {

  const data = props.location.state;
  const account_id = useSelector(state=>state.selections.account.id)
  const dispatch = useDispatch()
  const lang = useSelector(state => state.Login.lang);
  const user = useSelector(state=>state.Login.user)
  const [error, setError] = useState(false);
  const [group, setGroup] = useState({
    name: '',
    address: '',
    contact_person: '',
    contact_phone: '',
  });
  const isEdit = !!data.name;

  const save = async() => {
    if (!group.name) return setError(true)

    if (isEdit) {
      await http.put(URL.PUT_updateGroup, group)
    } else {
      await http.post(URL.POST_createGroup, group);
      props.history.replace("/groups")
    }

  }

  const selectAccount = () => {
   // dispatch(setCurrentGroup({ id: data.id, group, person, contactPhone, address }));
    props.history.push('/group_details');
  }

  const handleInputChange = ({ name, value }) => {
    setGroup({ ...group, [name]: value })
  }

  useEffect(()=>{
    if(data.name){
      setGroup({
        id: data.id,
        name: data.name,
        address: data.address,
        contact_person: data.contact_person,
        contact_phone: data.contact_phone,
        account_id: data.account_id
      })
    }else{
      setGroup({
        name: '',
        address: '',
        contact_person: '',
        contact_phone: '',
        account_id: account_id
      })

    }
  }, []);

  const navigate = (path) => {
    props.history.push(path)
  }

  return (
    <div className={"page-content"}>
      {
        group.name&&(<h1 className={'alert alert-dark'} style={{textAlign: 'center'}}>{group.name}</h1>)
      }

      {isEdit&&(<Row>
        <Col lg="3">
          <Card className="card-radio">
            <div style={{ fontSize: 36, textAlign: "center" }}>
              <i className="fas fa-car" />
              <h2 style={{ fontSize: 34 }}>{lang === "en" ? "Cars" : "السيارات"}</h2>
              <button className={"btn btn-outline-dark"} onClick={()=>navigate('/cars')}>
                {lang === "en" ? "Select" : "إختيار"}
              </button>
            </div>
          </Card>
        </Col>
        <Col lg="3">
          <div className="card-radio">
            <div style={{ fontSize: 36, textAlign: "center" }}>
              <i className="dripicons-user" />
              <h2 style={{ fontSize: 34 }}>{lang === "en" ? "Drivers" : "السائقون"}</h2>
              <button className={"btn btn-outline-dark"}  onClick={()=>navigate('/drivers')}>
                {lang === "en" ? "Select" : "إختيار"}
              </button>
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="card-radio">
            <div style={{ fontSize: 36, textAlign: "center" }}>
              <i className="fas fa-road" />
              <h2 style={{ fontSize: 34 }}>{lang === "en" ? "Paths" : "المسارات"}</h2>
              <button className={"btn btn-outline-dark"}  onClick={()=>navigate('/paths')}>
                {lang === "en" ? "Select" : "إختيار"}
              </button>
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="card-radio">
            <div style={{ fontSize: 36, textAlign: "center" }}>
              <i className="dripicons-expand" />
              <h2 style={{ fontSize: 34 }}>{lang === "en" ? "Dashboard" : "لوحه التحكم"}</h2>
              <button className={"btn btn-outline-dark"}>
                {lang === "en" ? "Select" : "إختيار"}
              </button>
            </div>
          </div>
        </Col>
      </Row>)}

      {(user.role_id===1 || user.role_id===2) &&(<div>
        <Card>
          <CardBody>
            {
              (error) &&
              (<div className={"alert alert-danger"}>Error</div>)
            }

            <Input
              name={"name"}
              type={"text"}
              value={group.name}
              label= {lang === "en" ? "Group" : "الفرع"}
              error={error}
              handleChange={handleInputChange}
            />

            <Input
              name={"address"}
              type={"text"}
              value={group.address}
              label={lang === "en" ? "Address" : "العنوان"}
              handleChange={handleInputChange}
            />

            <Input
              name={"contact_person"}
              type={"text"}
              value={group.contact_person}
              label={lang === "en" ? "Contact Person" : "إسم المسؤول"}
              handleChange={handleInputChange}
            />

            <Input
              name={"contact_phone"}
              type={"text"}
              value={group.contact_phone}
              label={lang === "en" ? "Contact phone" : "رقم تليفون المسؤول"}
              handleChange={handleInputChange}
            />


            {/* Submit */}
            {/*<Row className="mb-3">*/}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {(user.role_id===1)&&(<button
                className={"btn btn-success"}
                onClick={save}
              >{lang === "en" ? "Save" : "حفظ"}
              </button>)}

            </div>
          </CardBody>
        </Card>
      </div>)}
    </div>

  )
}

export default Group
