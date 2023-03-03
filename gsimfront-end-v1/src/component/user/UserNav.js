import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import User from './User';

const UserNav = () => {
    return(
        <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"addUser"} className="nav-link" >Add User</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listUser"} className="nav-link" default>User List</Link>
                </Nav.Item>

              </Nav>

    );

}

export default UserNav;