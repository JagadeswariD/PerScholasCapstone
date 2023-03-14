import {Card, Form, Button, Row, Col} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import UserService from './UserService'
import ToastPop from '../utils/MyToast'
import { useParams, useNavigate } from 'react-router-dom'
import AuthService from "../authservices/AuthService";

const User = (props) => {

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [updated,setUpdated] = useState(false);
const [url,setUrl] = useState(null);

    const roles={
        id:'',
        name:''
    };
    const initialState = {
        id:'',
         userFirstName :'',
         userLastName : '',
         email : '',
         username : '',
         password : '',
         role: 'ROLE_USER'

    };
     const [user, setUser] = useState(initialState);
    const resetUser = (e) =>
    {
        setUser(()=>initialState);

    }
   const { id } = useParams();
   useEffect(() => {
   //setUser(()=>initialState);

   const currentUser = AuthService.getCurrentUser();
   console.log(currentUser);
             if(currentUser!= null){
                    if(currentUser.roles[0] === "ROLE_USER"){
                          navigate("/home/permission");
                    }
            }
             else
             {
                  navigate("/login");
                  window.location.reload();
             }
                if(id){
                        userById(id);
                }

          }, []);

  const userById = async (id) => {
           try {
                     await UserService.getUserByID(id).then(response => {
                           if(response.status === 200){
                                setUser(response.data);
                            }
                    },(error) => {
                          if(error.response.status===401){
                               AuthService.logout();
                               navigate("/home/sessionExpired");
                          }else{
                               setShow(true);
                                setHeader("Error");
                               setMessage(error.response.data.message);
                          }
                     })
                } catch (err){
                    console.log(err);
                }
  };

  const [show, setShow] = useState(false);
    const updateUser = async (e) =>
    {
        e.preventDefault();
        try{
                await UserService.updateUser(user,id).then(response => {
                    if(response.status === 200){
                        setUser(()=>initialState);setUrl(-1);
                        setShow(true);setUpdated(true);
                        setHeader("Success");
                        setMessage("User updated successfully!!!")
                    }
                    },(error) => {
                        if(error.response.status===401){
                             AuthService.logout();
                             navigate("/home/sessionExpired");
                        }else{
                             setShow(true);
                              setHeader("Error");
                             setMessage(error.response.data.message);
                        }
                   });
          } catch (error) {
             console.log(error);
             AuthService.logout();
             navigate("/home/sessionExpired");
           }
    }

 const submitUser = async (e) =>
    {
        e.preventDefault();
        console.log(user);
         try{
                 await UserService.addUser(user).then(response => {
                        if(response.status === 200){
                        console.log(response.data);
                            setUser(()=>initialState);
                            setShow(true);
                            setMessage("User added successfully!!!");
                            setHeader("Success");
                        }},(error) => {
                             if(error.response.status===401){
                                  AuthService.logout();
                                  navigate("/home/sessionExpired");
                             }else{
                                 setHeader("Error");
                                 setShow(true);
                                 setMessage(error.response.data.message);
                             }
                       });
            } catch (error) {
                console.log(error);

             }

    }
 const handleChange = event => {
        if(event.target.name === 'userStatus'){
         if(event.target.checked){
            setUser({...user, [event.target.name]: event.target.checked})
        }
        else{
            setUser({...user, [event.target.name]: false})
        }
        }
        else
        {
             const { name, value } = event.target
             setUser({...user, [name]: value })
        }
    }




 return(
  <div>
        <div>
           { show &&
            <ToastPop url={url} setShow={setShow} header={header} message= {message}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update User" : "Create User"}</Card.Header>
                <Form id="userFormID" onSubmit={id ? updateUser : submitUser} onReset={resetUser}>
                <Card.Body>
                <Row>
                     <Col> <Form.Group className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control required type="text" placeholder="Enter user first name"  name="userFirstName"  value={user.userFirstName} onChange={handleChange}/>
                       </Form.Group></Col>
                       <Col><Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter user last name" name="userLastName" value={user.userLastName} onChange={handleChange}/>
                       </Form.Group></Col> </Row>
                 <Row> <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control required type="email" placeholder="Enter user email" name="email" value={user.email} onChange={handleChange}/>
                             <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                             </Form.Text>
                       </Form.Group></Col></Row>
                 <Row> <Col><Form.Group className="mb-3">
                               <Form.Label>UserName</Form.Label>
                               <Form.Control required type="text" placeholder="Enter username" name="username" value={user.username} onChange={handleChange}/>
                          </Form.Group></Col>
                       <Col><Form.Group className="mb-3">
                               <Form.Label>Password</Form.Label>
                               <Form.Control required type="password" placeholder="Enter user password" name="password" value={user.password} onChange={handleChange}/>
                          </Form.Group></Col></Row>

                       <Form.Group className="mb-3" controlId="formBasicSelect">
                       <Form.Label>Select a Role</Form.Label>
                       <Form.Select size="sm" style={{"width":"150px"}} name="role" onChange={handleChange}>
                               <option value="ROLE_USER">ROLE_USER</option>
                               <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                       </Form.Select>
                       </Form.Group>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                     <Button className="formButton" variant="primary" type="submit" disabled={updated ? 1 : 0}>
                         <FontAwesomeIcon icon={faSave} /> {id ? "Update" : "Submit"}
                     </Button>
                     &nbsp;
                     <Button className="formButton" variant="primary" type="reset">
                          <FontAwesomeIcon icon={faUndo} /> Reset
                     </Button>
                </Card.Footer>
                 </Form>
              </Card>
     </div>

    );

}

export default User;