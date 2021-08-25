import React, {useContext, useEffect, useState} from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {api} from "../../services/api";
import {EventContext} from "../../contexts/EventContext";

function Header() {
  const { event } = useContext(EventContext || null)
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  useEffect(() => {
    if(event){
      api.get(`/users/?id_event=${event}&skip=0&limit=1`).then(response => {
        setTotalUsers(response.data.total_users)
      })
      api.get(`/users-click/clicks?id_event=${event}&skip=0&limit=1`).then(response => {
        setTotalClicks(response.data.total_clicks)
      })
    }

  },[event])
  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total de usuários
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalUsers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/*<p className="mt-3 mb-0 text-muted text-sm">*/}
                    {/*  <span className="text-success mr-2">*/}
                    {/*    <i className="fa fa-arrow-up" /> 3.48%*/}
                    {/*  </span>{" "}*/}
                    {/*  <span className="text-nowrap">Since last month</span>*/}
                    {/*</p>*/}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Clicks
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalClicks}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/*<p className="mt-3 mb-0 text-muted text-sm">*/}
                    {/*  <span className="text-danger mr-2">*/}
                    {/*    <i className="fas fa-arrow-down" /> 3.48%*/}
                    {/*  </span>{" "}*/}
                    {/*  <span className="text-nowrap">Since last week</span>*/}
                    {/*</p>*/}
                  </CardBody>
                </Card>
              </Col>
              {/*<Col lg="6" xl="3">*/}
              {/*  <Card className="card-stats mb-4 mb-xl-0">*/}
              {/*    <CardBody>*/}
              {/*      <Row>*/}
              {/*        <div className="col">*/}
              {/*          <CardTitle*/}
              {/*            tag="h5"*/}
              {/*            className="text-uppercase text-muted mb-0"*/}
              {/*          >*/}
              {/*            Sales*/}
              {/*          </CardTitle>*/}
              {/*          <span className="h2 font-weight-bold mb-0">924</span>*/}
              {/*        </div>*/}
              {/*        <Col className="col-auto">*/}
              {/*          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">*/}
              {/*            <i className="fas fa-users" />*/}
              {/*          </div>*/}
              {/*        </Col>*/}
              {/*      </Row>*/}
              {/*      <p className="mt-3 mb-0 text-muted text-sm">*/}
              {/*        <span className="text-warning mr-2">*/}
              {/*          <i className="fas fa-arrow-down" /> 1.10%*/}
              {/*        </span>{" "}*/}
              {/*        <span className="text-nowrap">Since yesterday</span>*/}
              {/*      </p>*/}
              {/*    </CardBody>*/}
              {/*  </Card>*/}
              {/*</Col>*/}
              {/*<Col lg="6" xl="3">*/}
              {/*  <Card className="card-stats mb-4 mb-xl-0">*/}
              {/*    <CardBody>*/}
              {/*      <Row>*/}
              {/*        <div className="col">*/}
              {/*          <CardTitle*/}
              {/*            tag="h5"*/}
              {/*            className="text-uppercase text-muted mb-0"*/}
              {/*          >*/}
              {/*            Performance*/}
              {/*          </CardTitle>*/}
              {/*          <span className="h2 font-weight-bold mb-0">49,65%</span>*/}
              {/*        </div>*/}
              {/*        <Col className="col-auto">*/}
              {/*          <div className="icon icon-shape bg-info text-white rounded-circle shadow">*/}
              {/*            <i className="fas fa-percent" />*/}
              {/*          </div>*/}
              {/*        </Col>*/}
              {/*      </Row>*/}
              {/*      <p className="mt-3 mb-0 text-muted text-sm">*/}
              {/*        <span className="text-success mr-2">*/}
              {/*          <i className="fas fa-arrow-up" /> 12%*/}
              {/*        </span>{" "}*/}
              {/*        <span className="text-nowrap">Since last month</span>*/}
              {/*      </p>*/}
              {/*    </CardBody>*/}
              {/*  </Card>*/}
              {/*</Col>*/}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
