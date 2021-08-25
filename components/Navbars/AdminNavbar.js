import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // Form,
  // FormGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Input,
  // InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import Select from "react-select";
import {AuthContext} from "../../contexts/AuthContext";
import {api} from "../../services/api";
import {destroyCookie} from 'nookies'
import Router from "next/router";
import {toast} from "react-toastify";
import {EventContext} from "../../contexts/EventContext";

function AdminNavbar({ brandText }) {
  const [events, setEvents] = useState([]);


  const { user } = useContext(AuthContext || null)
  const { handleChangeEvent, event } = useContext(EventContext || null)
  useEffect(() => {
    const token = localStorage.getItem("whydo:accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    api.get('/events/', config).then(({data}) => {
      setEvents(data)
    })
  },[])


  let options = [];
  events.map(event => {
    const value = event.name.toLowerCase()
    options.push({
      id: event.id,
      value,
      label: event.name
    })
  })

  const name = user ? user.name : 'Usuario'
  const [eventByUser] = options.filter(it => it.id === event)

  function handleLogout() {
    destroyCookie(undefined, 'whydo-token')
    destroyCookie(undefined, 'whydo-email')


    Router.push("/auth/login");
    toast.success('Deslogado com sucesso!', {
      position: toast.POSITION.TOP_CENTER
    })
  }


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container className="headerContainer" fluid >
          <div style={{width: '250px'}}>
            <Select
              instanceId={"react-select"}
              onChange={e => handleChangeEvent(e.id)}
              value={eventByUser}
              options={options} />
          </div>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem onClick={() => handleLogout()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
