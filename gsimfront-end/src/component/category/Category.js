import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import CategoryService from './CategoryService'
import CategoryToast from './CategoryToast'
import { useParams } from 'react-router-dom'

const Category = (props) => {

    const initialState = {
         id:'',
         categoryName :'',
         categoryDescription : '',
      };
     const [category, setCategory] = useState(initialState);
    const resetCategory = (e) =>
    {
        setCategory(()=>initialState);

    }
   const { id } = useParams();
   useEffect(() => {
                if(id){
                        categoryById(id);
                }

          }, []);

  const categoryById = (id) => {
        CategoryService.getCategoryByID(id)
            .then(res => {
                    if(res.data!= null){
                        setCategory(res.data);
                    }
            })
  };

  const [show, setShow] = useState(false);
    const updateCategory = (e) =>
    {
        e.preventDefault();
        CategoryService.updateCategory(category,id)
            .then(response => {
                if(response.data != null){
                    setCategory(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }

 const submitCategory = (e) =>
    {
        e.preventDefault();
        CategoryService.addCategory(category)
            .then(response => {
                if(response.data != null){
                    setCategory(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }
 const handleChange = event => {

     const { name, value } = event.target
     setCategory({...category, [name]: value })

    }




    return(

    <div>
        <div>
           { show &&
            <CategoryToast  header="Success" message= {id ? "Category updated successfully!!!" : "Category added successfully!!!"}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update category" : "Create New Category"}</Card.Header>
                <Form id="categoryFormID" onSubmit={id ? updateCategory : submitCategory} onReset={resetCategory}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>Category Name</Form.Label>
                           <Form.Control required type="text" placeholder="Enter category name"  name="categoryName"  value={category.categoryName} onChange={handleChange}/>
                       </Form.Group>

                       <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required type="text" placeholder="Enter description" name="categoryDescription" value={category.categoryDescription} onChange={handleChange}/>
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

export default Category;