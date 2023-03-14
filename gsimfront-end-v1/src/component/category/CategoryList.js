import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import CategoryService from './CategoryService'
import React, {useState, useEffect} from "react";
import CategoryToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const CategoryList = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState();
     const [categories, setCategories] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);

      useEffect(() => {

       const currentUser = AuthService.getCurrentUser();
             if(currentUser!= null){

                  setRole(currentUser.roles);
                   CategoryService.getCategories().then((res) =>{
                        let data =res.data;
                       setCategories(data);  },
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

       }, [])


   const [show, setShow] = useState(false);

   const deleteCategory =async (Id) => {
         try{
             await CategoryService.deleteCategory(Id).then((res) => {

                if(res.data != null){
                     setShow(true);
                     setCategories(categories.filter((category)=> category.id !== Id));
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
    };


    const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        const currentItems = categories.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(categories.length / itemsPerPage);

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
                if(currentPage < Math.ceil(categories.length/itemsPerPage))
                {
                    setCurrentPage(Math.ceil(categories.length/itemsPerPage));
                }
            };

        const nextPage= () => {
            if(currentPage < Math.ceil(categories.length/itemsPerPage))
            {
                setCurrentPage(currentPage+1);
            }
        };




    return(
     <div>
            <div>
               { show &&
                <CategoryToast  header="Success" setShow={setShow} message="Category deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Category List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Creation Date</th>
                      <th>Modified Date</th>
                      {role == "ROLE_ADMIN" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                         {
                            categories.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Category Details Not Added</td>
                            </tr> :
                            currentItems.map((category) =>
                                <tr key={category.id}>

                                    <td>{category.categoryName}</td>
                                    <td>{category.categoryDescription}</td>
                                    <td>{new Date(category.creationDate).toDateString()}</td>
                                    <td>{new Date(category.modifiedDate).toDateString()}</td>
                                    {role == "ROLE_ADMIN" &&
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editCategory/"+category.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                                            <Button variant="outline-danger"  onClick={() => deleteCategory(category.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
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

export default CategoryList;