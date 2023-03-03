import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import UserService from './UserService'
import React, {useState, useEffect} from "react";
import ToastPop from '../utils/MyToast';
import {Link} from 'react-router-dom';

const UserList = () => {

     const [users, setUsers] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);


      useEffect(() => {
          UserService.getUsers().then((res) =>{
                         setUsers( res.data);

                 });
       }, [])

     const [show, setShow] = useState(false);

   const deleteUser = (Id) => {
         UserService.deleteUser(Id).then((res) => {
            if(res.data != null){
                 setShow(true);
                 setUsers(users.filter((user)=> user.id !== Id));
            }
            else
            {
                setShow(false);
            }
         })
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
                <ToastPop  header="Success" message="User deleted successfully!!!"/>}
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
                      <th>Creation Date</th>
                      <th>Modified Date</th>
                      <th>Action</th>
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
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editUser/"+user.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                                            <Button variant="outline-danger"  onClick={() => deleteUser(user.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
                                        </ButtonGroup>
                                    </td>
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
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === 1 ? true : false}
                    onClick={firstPage}>
                <FontAwesomeIcon icon={faFastBackward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === 1 ? true : false}
                   onClick={prevPage} >
                <FontAwesomeIcon icon={faStepBackward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === totalPages ? true : false}
                  onClick={nextPage}>
                <FontAwesomeIcon icon={faStepForward} />
                </Button>
                <Button className="formButton" type="button" variant="outline-info" disable={currentPage === totalPages ? true : false}
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