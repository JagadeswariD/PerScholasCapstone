import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import UserService from './UserService'
import React, {useState, useEffect} from "react";
import ToastPop from '../utils/MyToast';
import {Link} from 'react-router-dom';
import AuthService from "../authservices/AuthService";
import { useNavigate } from "react-router-dom";

const UserList = () => {
     const navigate = useNavigate();
     const [users, setUsers] = useState([]);
     const [role, setRole] = useState('');
     const [curUser, setCurUser] = useState();
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);
     const [id,setId]=useState();

     useEffect(() => {
      try{
        const currentUser = AuthService.getCurrentUser();

                   if(currentUser!= null){
                        setCurUser(currentUser);
                        setId(currentUser.id)
                        setRole(currentUser.roles[0]);
                        UserService.getUsers().then((res) =>{
                                              setUsers( res.data); },
                        (error) => {
                               console.log(error);
                                AuthService.logout();
                                navigate("/home/sessionExpired");
                          });
                   }
                   else
                   {
                    navigate("/login");
                    window.location.reload();
                   }
        }catch(err)
        {
               console.log(err);
        }

       }, [])


     const [show, setShow] = useState(false);

   const deleteUser = async (Id) => {

        if(Id === id)
        {
            alert("Deleting current user account is prohibited");
        }
        else
        {
         try{
             await UserService.deleteUser(Id).then((res) => {
                if(res.data != null){
                     setShow(true);
                     setUsers(users.filter((user)=> user.id !== Id));
                }
                else
                {
                    setShow(false);
                }
             })
       }catch (error) {
           console.log(error);
           AuthService.logout();
           navigate("/home/sessionExpired");
      }
      }
    };

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = users.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const firstPage= () => {
        if(currentPage > 1)
        {
            setCurrentPage(1);
        }
    };

    const prevPage= () => {
        if(currentPage > 1)
        {
            setCurrentPage(currentPage-1);
        }
    };

    const lastPage= () => {
            if(currentPage < Math.ceil(users.length/itemsPerPage))
            {
                setCurrentPage(Math.ceil(users.length/itemsPerPage));
            }
        };

    const nextPage= () => {
        if(currentPage < Math.ceil(users.length/itemsPerPage))
        {
            setCurrentPage(currentPage+1);
        }
    };

    return(


     <div>
            <div>
               { show &&
                <ToastPop setShow={setShow} header="Success" message="User deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> User List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>UserName</th>
                      <th>Role</th>
                      {role == "ROLE_ADMIN" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                         {
                            users.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Users Not Available</td>
                            </tr> :
                            currentItems.map((user) =>

                                <tr key={user.id}>

                                    <td>{user.userFirstName}</td>
                                    <td>{user.userLastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    {role == "ROLE_ADMIN" &&
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editUser/"+user.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                                            <Button variant="outline-danger"  onClick={() => deleteUser(user.id)}  > <FontAwesomeIcon icon={faTrash} /> </Button>
                                        </ButtonGroup>
                                    </td>}

                                </tr>
                            )
                        }
                  </tbody>
                </Table>
      </Card.Body>
      <Card.Footer>
        <div style={{"float": "left"}}>
            Showing Page {currentPage} of {totalPages}
        </div>
        <div style={{"float": "right"}}>
             <InputGroup>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === 1 ? 1 : 0}
                    onClick={firstPage}>
                <FontAwesomeIcon icon={faFastBackward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === 1 ? 1 : 0}
                   onClick={prevPage} >
                <FontAwesomeIcon icon={faStepBackward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === totalPages ? 1 : 0}
                  onClick={nextPage}>
                <FontAwesomeIcon icon={faStepForward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === totalPages ? 1 : 0}
                  onClick={lastPage}>
                <FontAwesomeIcon icon={faFastForward} />
                </Button>
             </InputGroup>
        </div>
      </Card.Footer>
    </Card>
    </div>
    );

}

export default UserList;