import React from "react"
import MetaTags from 'react-meta-tags';
import {
  Container
} from "reactstrap"
import RootDashboard from "../../components/dashboards/root"

const Dashboard = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | LimoTrack</title>
        </MetaTags>
        <Container fluid>
          <RootDashboard />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
