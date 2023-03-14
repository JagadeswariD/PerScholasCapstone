import {Row, Col, Card, Form,  Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus, faUser,faSignInAlt, faLock, faUndo,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import UserService from "./UserService";


const Register = (props) => {


const [error, setError] = useState();
const [message, setMessage] = useState();
const [show, setShow] = useState(false);
const [eshow, setEshow] = useState(false);

 const initialState = {
      userFirstName: "",
      userLastName: "",
      username: "",
      email: "",
      password: "",
      role: "ROLE_USER"
    };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };



  const saveUser = async (event) => {

         event.preventDefault();
         try{
                 await UserService.register(user).then(response => {
                        if(response.status === 200){
                            setUser(()=>initialState);
                           setMessage(response.data.message);
                            setShow(true);
                         }}, error => {
                            alert(error.response.data.message)
                           setEshow(true);
                           setUser(()=>initialState);
                           setError(error.response.data.message);
                           });
             }catch(err)
             {
                    console.log(err);
             }


    };

  const resetRegisterForm = () => {
    setUser(initialState);
  };

return(
<Row className="justify-content-md-center">
    <Col xs={5} >
    {show && message!=='' && (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    )}
    {eshow && error && (
      <Alert variant="danger" onClose={() => setEshow(false)} dismissible>
        {error}
      </Alert>
    )}
    <Card>
      <Card.Header>
        <FontAwesomeIcon icon={faUserPlus} /> Registration

      </Card.Header>
        <Form id="RegistrationFormID" onSubmit={saveUser} onReset={resetRegisterForm}>
      <Card.Body>

      <Form.Group className="mb-3">
             <Form.Label>First Name</Form.Label>
                 <Form.Control maxLength={80} minLength={3} required type="text" placeholder="Enter user first name"  name="userFirstName"  value={user.userFirstName} onChange={userChange} autoComplete="off"/>
                </Form.Group>
             <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control  maxLength={80} minLength={3} required type="text" placeholder="Enter user last name" name="userLastName" value={user.userLastName} onChange={userChange} autoComplete="off"/>
             </Form.Group>
              <Form.Group className="mb-3">
                    <Row><Col>
                    <Form.Label><FontAwesomeIcon icon={faUser} />User Name</Form.Label>
                    <Form.Control maxLength={80} minLength={3} required type="text" placeholder="Enter user name"  name="username"  value={user.username} onChange={userChange} autoComplete="off"/>
                    </Col><Col><Form.Label><FontAwesomeIcon icon={faLock} />Password</Form.Label>
                    <Form.Control maxLength={250} minLength={8} required type="password" placeholder="Enter password"  name="password"  value={user.password} onChange={userChange} autoComplete="off"/>
                    </Col></Row>
              </Form.Group>
         <Form.Group className="mb-3" >
                  <Form.Label><FontAwesomeIcon icon={faEnvelope} />Email</Form.Label>
                  <Form.Control maxLength={250} minLength={8} required type="email" placeholder="Enter email"  name="email"  value={user.email} onChange={userChange} autoComplete="off"/>
              </Form.Group>

             <Form.Group className="mb-3" >
                </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSelect">

           <Form.Label>Select a Role</Form.Label>
           <Form.Select size="sm" style={{"width":"150px"}} name="role" value={user.role} onChange={userChange}>
                   <option default value="ROLE_USER">ROLE_USER</option>
                   <option value="ROLE_ADMIN">ROLE_ADMIN</option>
           </Form.Select>
           </Form.Group>

      </Card.Body>
       <Card.Footer style={{"textAlign":"right"}}>
        <Button className="formButton" variant="primary" type="submit">
            <FontAwesomeIcon icon={faSignInAlt} /> Register
        </Button>{' '}
        <Button className="formButton" variant="primary" type="reset">
             <FontAwesomeIcon icon={faUndo} /> Reset
        </Button>
       </Card.Footer>
        </Form>
    </Card>
  </Col>
</Row>
);

}
export default Register;