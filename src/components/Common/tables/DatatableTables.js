import React from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import MetaTags from "react-meta-tags"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"

const { ExportCSVButton } = CSVExport;
//Import Breadcrumb
import Breadcrumbs from "../Breadcrumb"
import "./datatables.scss"

const DatatableTables = (props) => {

  const { columns, data: productData } = props

  const defaultSorted = [{
    dataField: "id",
    order: "asc"
  }]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true
  }

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "All", value: (productData).length }]

  const handleOnSelect = (row, isSelect) => {
    props.handleSelection(row, isSelect)
  }

  const handleOnSelectAll=(isSelect) => {
    props.handleSelectAll(isSelect)

  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  }

  const { SearchBar } = Search

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      props.selectDevice(row)
    }
  }


  return (
    <React.Fragment>
      <div>
        <div className="">
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={productData}
                        search
                        exportCSV
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <div>
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col className="search-box me-2 mb-2 d-inline-block">
                                  {/*// style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>*/}
                                <div >
                                  <button
                                    className={'btn'}
                                    style={{float: 'right'}}
                                    hidden={props.deleteBtn}
                                    onClick={props.removeSelected}
                                  >
                                    <h2 style={{color: 'red'}}><i className={'fas fa-archive'} /></h2>
                                  </button>
                                </div>
                                <div style={{float: 'right'}}>
                                  <ExportCSVButton { ...toolkitProps.csvProps }>
                                    <h2 style={{color: 'blue'}}><i className={'fas fa-save'} /></h2>
                                  </ExportCSVButton>
                                </div>
                              </Col>

                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">

                                  <BootstrapTable
                                    keyField={"id"}
                                    onClicke={() => console.log("Clicked")}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    rowEvents={tableRowEvents}
                                    classes={
                                      "table align-middle table-nowrap"
                                    }
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />

                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )
                        }
                      </ToolkitProvider>
                    )
                    }</PaginationProvider>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DatatableTables
