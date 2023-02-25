import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import ProductService from './ProductService'
import ProductToast from './ProductToast'
import { useParams } from 'react-router-dom'

const Product = (props) => {

    const initialState = {
         id:'',
         productName :'',
         productDescription : '',
      };
     const [product, setProduct] = useState(initialState);
    const resetProduct = (e) =>
    {
        setProduct(()=>initialState);

    }
   const { id } = useParams();
   useEffect(() => {
                if(id){
                        productById(id);
                }

          }, []);

  const productById = (id) => {
        ProductService.getProductByID(id)
            .then(res => {
                    if(res.data!= null){
                        setProduct(res.data);
                    }
            })
  };

  const [show, setShow] = useState(false);
    const updateProduct = (e) =>
    {
        e.preventDefault();
        ProductService.updateProduct(product,id)
            .then(response => {
                if(response.data != null){
                    setProduct(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }

 const submitProduct = (e) =>
    {
        e.preventDefault();
        ProductService.addProduct(product)
            .then(response => {
                if(response.data != null){
                    setProduct(()=>initialState);
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
     setProduct({...product, [name]: value })

    }




    return(

    <div>
        <div>
           { show &&
            <ProductToast  header="Success" message= {id ? "Product updated successfully!!!" : "Product added successfully!!!"}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update product" : "Create New product"}</Card.Header>
                <Form id="productFormID" onSubmit={id ? updateProduct : submitProduct} onReset={resetProduct}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>Product Name</Form.Label>
                           <Form.Control required type="text" placeholder="Enter product name"  name="productName"  value={product.productName} onChange={handleChange}/>
                       </Form.Group>
                       
                       <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required type="text" placeholder="Enter description" name="productDescription" value={product.productDescription} onChange={handleChange}/>
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

export default Product;