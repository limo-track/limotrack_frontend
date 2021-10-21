import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import CountsCard from "../misc/countsCard"
import { useSelector } from "react-redux"
import ColumnWithDataLabels from "../../pages/template/AllCharts/apex/ColumnWithDataLabels"
import { GET_counts } from "../../helpers/url_helper"
import http from "../../services/httpServices"
import { useEffect, useState } from "react"

function RootDashboard(props) {
  const lang = useSelector(state => state.Login.lang)
  const [counts, setCounts] = useState({
    users: 0,
    accounts: 0,
    devices: 0,
    devicePerAccount: []
  })

  useEffect(async () => {
    const { data } = await http.get(GET_counts)
    console.log('DATA', data)
    setCounts(data);
  }, [])
  return (
    <div className={"container"}>
      <Row>
        <Col lg="4">
          <CountsCard
            header={lang === "en" ? "Devices" : "الاجهزة"}
            subHeader={lang === "en" ? "Total" : "الاجمالي"}
            count={counts.devices}
            unit={lang === "en" ? "Device" : "جهاز"}
            link={"/devices"}
          />
        </Col>
        <Col lg="4">
          <CountsCard
            header={lang === "en" ? "Accounts" : "الشركات"}
            subHeader={lang === "en" ? "Total" : "الاجمالي"}
            count={counts.accounts}
            unit={lang === "en" ? "Account" : "شركه"}
            link={"/accounts"}
          />
        </Col>
        <Col lg="4">
          <CountsCard
            header={lang === "en" ? "Users" : "المستخدمون"}
            subHeader={lang === "en" ? "Total" : "الاجمالي"}
            count={counts.users}
            unit={lang === "en" ? "User" : "مستخدم"}
            link={"/users"}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">
                Accounts-Cars Chart{" "}
              </CardTitle>
              <ColumnWithDataLabels devicePerAccount={counts.devicePerAccount}/>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default RootDashboard