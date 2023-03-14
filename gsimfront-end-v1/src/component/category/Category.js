import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import CategoryService from './CategoryService'
import CategoryToast from '../utils/MyToast'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const Category = (props) => {

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [updated,setUpdated] = useState(false);
const [url,setUrl] = useState(null);
const initialState = {
        id:'',
        categoryName :'',
        categoryDescription : '',
    };
const [category, setCategory] = useState(initialState);
const { id } = useParams();

    const resetCategory = (e) =>
    {
        setCategory(()=>initialState);

    }


   useEffect(() => {

       const currentUser = AuthService.getCurrentUser();
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
                categoryById(id);
        }

          },[]);

  const categoryById = async (id) => {
        try{
                 await CategoryService.getCategoryByID(id).then(response => {
                         if(response.status === 200){
                            setCategory(response.data);
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
            }catch (error) {
                console.log(error);
              }
  };

  const [show, setShow] = useState(false);
    const updateCategory = async (e) =>
    {
        e.preventDefault();
       try{
               await CategoryService.updateCategory(category,id).then(response => {
                         if(response.status === 200){
                            setCategory(()=>initialState);setUrl(-1);
                            setShow(true);setUpdated(true);
                            setHeader("Success");
                            setMessage("Category updated successfully!!!")
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
          }catch (error) {
              console.log(error);
              AuthService.logout();
              navigate("/home/sessionExpired");
            }
    }

     const submitCategory = async (e) =>
     {
            e.preventDefault();
           try{
                   await CategoryService.addCategory(category).then(response => {

                        if(response.status === 200){
                            setCategory(()=>initialState);
                            setMessage("Category added successfully!!!");
                            setHeader("Success");
                            setShow(true);
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
             }
             catch (error) {
                console.log(error);
              }
     }

    const handleChange = event => {
        const { name, value } = event.target
         setCategory({...category, [name]: value })
    }




    return(
    <>
    <div>
       { show &&
        <CategoryToast url={url} header={header} setShow={setShow} message= {message}/>}
    </div>
    <div>


          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update category" : "Create New Category"}</Card.Header>
                <Form id="categoryFormID" onSubmit={id ? updateCategory : submitCategory} onReset={resetCategory}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>Category Name</Form.Label>
                           <Form.Control required maxLength={20}  type="text" placeholder="Enter category name"  name="categoryName"  value={category.categoryName} onChange={handleChange} autoComplete="off"/>
                       </Form.Group>

                       <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required maxLength={250}  type="text" placeholder="Enter description" name="categoryDescription" value={category.categoryDescription} onChange={handleChange} autoComplete="off"/>
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
     </>
    );

}

export default Category;