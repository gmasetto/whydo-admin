import React, {useContext, useEffect, useState} from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import {api} from "../../services/api";
import {AuthContext} from "../../contexts/AuthContext";
import {EventContext} from "../../contexts/EventContext";

function Tables() {
  const { event } = useContext(EventContext || null)

  const [listUsers, setListUsers ] = useState([])

  const [query, setQuery ] = useState({
    skip: 0,
    page: 1
  })
  useEffect(() => {
    if(event) {
      api.get(`/users/?id_event=${event}&skip=${query.skip}&limit=10`).then(response => {
        setListUsers(response.data)
      })
    }
  }, [event, query])

  function onNext() {
    const nextPage = query.page + 1;
    const nextSkip = query.skip + 10;
    const newQuery = {page: nextPage, skip: nextSkip}
    setQuery(newQuery)
  }
  function onPrevious() {
    const previousPage = query.page - 1;
    const previousSkip = query.skip - 10;
    const newQuery = {page: previousPage, skip: previousSkip}
    setQuery(newQuery)
  }
  const users = listUsers.users || [];

  const allPages = Math.round(listUsers.total_users / 10)

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Listagem de usuarios</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Evento</th>
                  {/*<th scope="col">Completion</th>*/}
                  {/*<th scope="col" />*/}
                </tr>
                </thead>
                <tbody>
                {users.map(it => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.name}</td>
                    <td>{it.email}</td>
                    <td>{it.id_event}</td>
                  </tr>
                ))}

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end styledPagination mb-0"
                    style={{alignItems: 'center'}}
                  >
                    <PaginationItem className="disabled registers" style={{fontSize: '12px', marginRight: '16px'}}>
                        total de registros: {listUsers.total_users}
                    </PaginationItem>
                    <PaginationItem className={query.page === 1 ? 'disabled' : ''}>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => onPrevious()}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active allPages" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        {query.page}
                      </PaginationLink>
                      de
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        {allPages}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={query.page === allPages ? 'disabled' : ''}>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => onNext()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Tables.layout = Admin;

export default Tables;
