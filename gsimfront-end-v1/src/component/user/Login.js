import {Row, Col, Card, Form,  Button, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt,  faUndo} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import AuthService from "../authservices/AuthService";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

const navigate = useNavigate();
const [error, setError] = useState();
  const [show, setShow] = useState(true);

  const initialState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };



  const validateUser = async (event) => {

         event.preventDefault();
          try {
               await AuthService.login(user).then(
                 (data) => {
                   navigate("/home");
                   window.location.reload();
                 },
                 (error) => {
                   setShow(true);
                  resetLoginForm();
                  setError("Invalid username and password");
                 }
               );
             } catch (err) {
               console.log(err);
             }


  };

  const resetLoginForm = () => {
    setUser(initialState);
  };

return(
<Row className="justify-content-md-center">
    <Col xs={5} >
    {show && props.message && (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {props.message}
      </Alert>
    )}
    {show && error && (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {error}
      </Alert>
    )}
    <Card>
      <Card.Header>
        <FontAwesomeIcon icon={faSignInAlt} /> Login

      </Card.Header>
        <Form id="loginFormID" onSubmit={validateUser} onReset={resetLoginForm}>
      <Card.Body>
      <Form.Group className="mb-3">
      <Row className="justify-content-md-center">
         <Col xs lg="2">
                   <Form.Label>Username</Form.Label>
           </Col>
          <Col md="auto">
            <Form.Control  type="text" placeholder="Enter username"  name="username" value={user.username} onChange={credentialChange} required autoComplete="off"/>
          </Col>
      </Row>
      </Form.Group>
      <Form.Group className="mb-3">
      <Row className="justify-content-md-center">
         <Col xs lg="2">
                   <Form.Label>Password</Form.Label>
           </Col>
          <Col md="auto">
            <Form.Control  type="password" placeholder="Enter password"  name="password" value={user.password} onChange={credentialChange} required autoComplete="off"/>
          </Col>
      </Row>
      </Form.Group>
      </Card.Body>
       <Card.Footer style={{"textAlign":"right"}}>
        <Button className="formButton" variant="primary" type="submit" disabled={user.username.length === 0 || user.password.length === 0} >
            <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Button>{' '}
        <Button className="formButton" variant="primary" type="reset" disabled={user.username.length === 0 && user.password.length === 0}>
             <FontAwesomeIcon icon={faUndo} /> Reset
        </Button>
       </Card.Footer>
        </Form>
    </Card>
  </Col>
</Row>
);

}
export default Login;