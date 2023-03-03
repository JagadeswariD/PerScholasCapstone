import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import UserService from './UserService'
import ToastPop from '../utils/MyToast'
import { useParams } from 'react-router-dom'

const User = (props) => {

    const roles={
        id:'',
        name:''
    };
    const initialState = {
        id:'',
         userFirstName :'',
         userLastName : '',
         email : '',
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
                if(id){
                        userById(id);
                }

          }, []);

  const userById = (id) => {
        UserService.getUserByID(id)
            .then(res => {
                    if(res.data!= null){
                        setUser(res.data);
                    }
            })
  };

  const [show, setShow] = useState(false);
    const updateUser = (e) =>
    {
        e.preventDefault();
        UserService.updateUser(user,id)
            .then(response => {
                if(response.data != null){
                    setUser(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }

 const submitUser = (e) =>
    {
        e.preventDefault();
        UserService.addUser(user)
            .then(response => {
                if(response.data != null){
                alert("hello");
                    setUser(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
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
            <ToastPop  header="Success" message= {id ? "User updated successfully!!!" : "User added successfully!!!"}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update User" : "Create User"}</Card.Header>
                <Form id="userFormID" onSubmit={id ? updateUser : submitUser} onReset={resetUser}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control required type="text" placeholder="Enter user first name"  name="userFirstName"  value={user.userFirstName} onChange={handleChange}/>
                       </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter user last name" name="userLastName" value={user.userLastName} onChange={handleChange}/>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control required type="email" placeholder="Enter user email" name="email" value={user.email} onChange={handleChange}/>
                             <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                             </Form.Text>
                       </Form.Group>
                       <Form.Group className="mb-3">
                               <Form.Label>Password</Form.Label>
                               <Form.Control required type="password" placeholder="Enter user password" name="password" value={user.password} onChange={handleChange}/>
                          </Form.Group>

                       <Form.Group className="mb-3" controlId="formBasicSelect">
                       <Form.Label>Select a Role</Form.Label>
                       <Form.Select size="sm" style={{"width":"150px"}} name="role" onChange={handleChange}>
                               <option value="ROLE_USER">ROLE_USER</option>
                               <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                       </Form.Select>
                       </Form.Group>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                     <Button className="formButton" variant="primary" type="submit">
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