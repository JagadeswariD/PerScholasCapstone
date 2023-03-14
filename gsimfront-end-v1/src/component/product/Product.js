import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import ProductService from './ProductService'
import ProductToast from '../utils/MyToast'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const Product = (props) => {

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [updated,setUpdated] = useState(false);
const [url,setUrl] = useState(null);
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
                 productById(id);
          }

          }, []);

  const productById = async (id) => {
      try{
         await ProductService.getProductByID(id).then(response => {
                    if(response.status === 200){
                        setProduct(response.data);
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
    const updateProduct = async (e) =>
    {
        e.preventDefault();
         try{
                 await ProductService.updateProduct(product,id).then(response => {
                 if(response.status === 200){
                    setProduct(()=>initialState);setUrl(-1);
                    setShow(true);setUpdated(true);
                    setHeader("Success");
                    setMessage("Product updated successfully!!!")
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

 const submitProduct = async (e) =>
    {
        e.preventDefault();
        try{
        await ProductService.addProduct(product).then(response => {
                if(response.status === 200){
                    setProduct(()=>initialState);
                    setShow(true);
                    setMessage("Product added successfully!!!");
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
          }
          catch (error) {
             console.log(error);
           }
    }
 const handleChange = event => {

     const { name, value } = event.target
     setProduct({...product, [name]: value })

    }




    return(

    <div>
        <div>
           { show &&
            <ProductToast url={url} header={header} setShow={setShow} message= {message}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update product" : "Create New product"}</Card.Header>
                <Form id="productFormID" onSubmit={id ? updateProduct : submitProduct} onReset={resetProduct}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>Product Name</Form.Label>
                           <Form.Control required maxLength={20} type="text" placeholder="Enter product name"  name="productName"  value={product.productName} onChange={handleChange} autoComplete="off"/>
                       </Form.Group>
                       
                       <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required maxLength={250} type="text" placeholder="Enter description" name="productDescription" value={product.productDescription} onChange={handleChange} autoComplete="off"/>
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

export default Product;