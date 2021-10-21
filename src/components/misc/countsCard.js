import { Card, Row } from "reactstrap"
import { Link } from "react-router-dom"


const CountsCard = (props) => {
  const {header, subHeader, count, unit, link} = props;
  return (
    <Card>
      <div className=" p-3 rounded mt-4">
        <div className="d-flex align-items-center mb-3">
          <h5 className="font-size-14 mb-0">{header}</h5>
        </div>
        <Row>
          <div className="col-lg-6">
            <div className="text-muted mt-3">
              <p>{subHeader}</p>
              <h4>{count}</h4>
              <p className="mb-0">{unit}</p>
            </div>
          </div>

          <div className="col-lg-6 align-self-end">
            <div className="float-end mt-3">
              <Link  to={link} className="btn btn-dark">
                Select
              </Link>
            </div>
          </div>
        </Row>
      </div>
    </Card>
  )
}

export default CountsCard