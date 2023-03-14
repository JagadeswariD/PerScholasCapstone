import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import AuthService from "./authservices/AuthService";

const NavigationBar = (props) => {

const [authenticated, setAuthenticated] = useState(false);
const [user, setUser] = useState();

useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if(currentUser)
    {   setAuthenticated(true);
        setUser(currentUser.username);
    }

}, [authenticated]);

    return (
       <div>       <Navbar bg="light" variant="light" >
                 <Container>
                          <Navbar.Brand href="">
                          <FontAwesomeIcon icon={faCartShopping} />
                          Grocery Store Inventory Management</Navbar.Brand>
                          {authenticated && (
                                <Nav className="ms-auto" >
                                <Nav.Link>
                                Welcome {user}
                                </Nav.Link>
                                <Nav.Link href={"/logout"} >Log out</Nav.Link>
                                </Nav>
                              )}
                              {!authenticated && (
                          <Nav className="ms-auto" >
                            <Nav.Link href={"/login"}>Sign In</Nav.Link> <Nav.Link>/</Nav.Link>
                            <Nav.Link href={"/register"}>Sign Up</Nav.Link>
                          </Nav>)}

                  </Container>
              </Navbar>
              <Navbar style={{"backgroundColor": "#444680"}}>
                   <Container>

                    </Container>
                </Navbar>
            </div>
        );
  }
export default NavigationBar;