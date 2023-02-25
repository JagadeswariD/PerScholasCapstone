import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'

class NavigationBar extends  React.Component{
    render(){
        return (
              <Navbar bg="light" variant="light">
                 <Container>
                          <Navbar.Brand href="#home">
                          <FontAwesomeIcon icon={faCartShopping} />
                          Grocery Store Inventory Management</Navbar.Brand>
                          <Nav className="ms-auto" >
                            <Nav.Link href="#home">Sign In</Nav.Link> <Nav.Link>/</Nav.Link>
                            <Nav.Link href="#features">Sign Up</Nav.Link>
                          </Nav>
                  </Container>
              </Navbar>

        );
    }

}
export default NavigationBar;