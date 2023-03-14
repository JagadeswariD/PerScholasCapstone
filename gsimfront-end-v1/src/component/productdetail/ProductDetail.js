import CategoryService from '../category/CategoryService'
import VendorService from '../vendor/VendorService'
import ProductService from '../product/ProductService'
import ProductDetailService from './ProductDetailService'
import ProductDetailToast from '../utils/MyToast'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";
import React, {useState, useEffect} from "react";
import {Card, Form, Button, Dropdown, ButtonGroup, Row, Col, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'

const ProductDetail = (props) => {

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [updated,setUpdated] = useState(false);
const [url,setUrl] = useState(null);
    const pd_initialState = {
            pdid:'',
            vendorid: '',
            categoryid: '',
            productid: '',
            productStockCount :'',
            productThresholdValue : ''
         };
    const [productDetail, setProductDetail] = useState(pd_initialState);
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productDetailUp, setProductDetailUp] = useState();
    const resetProductDetail = (e) =>
    {
        setProductDetail(()=>pd_initialState);
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
               productDetailById(id);
        }

        ProductService.getProducts().then((res) =>{setProducts( res.data); });
        VendorService.getVendors().then((res) =>{setVendors( res.data); });
        CategoryService.getCategories().then((res) =>{setCategories( res.data); });

      }, []);

const productDetailById = async (id) => {
        try{
        await ProductDetailService.getProductDetailByID(id).then(res => {
                    if(res.status === 200){
                       const pd_upinitialState = {
                                     pdid:res.data.id,
                                     vendorid: res.data.vendor.id,
                                     categoryid: res.data.category.id,
                                     productid: res.data.product.id,
                                     productStockCount :res.data.productStockCount,
                                     productThresholdValue : res.data.productThresholdValue,
                                  };
                             document.getElementById("pid").value=res.data.product.productName;
                             document.getElementById("cid").value=res.data.category.categoryName;
                             document.getElementById("vid").value=res.data.vendor.vendorEmail;
                             document.getElementById("sc").value=res.data.productStockCount;
                             document.getElementById("tv").value=res.data.productThresholdValue;
                          setProductDetail(pd_upinitialState);

                    }},(error) => {
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
const handleChange = event => {

     const { name, value } = event.target
     if(name === 'product' && !(value === 'Select a Product')){
        const findProd = products.find(product => product.productName === value);
        setProductDetail({...productDetail, "productid" : findProd.id });
      }
     else if(name === 'category' && !(value === "Select a Category")){
             const findCat = categories.find(category => category.categoryName === value);
             setProductDetail({ ...productDetail, "categoryid" : findCat.id });

       }
      else if(name === 'vendor' && !(value === "Select a Vendor")){
            const findVen = vendors.find(vendor => vendor.vendorEmail === value);
           setProductDetail({ ...productDetail, ["vendorid"] : findVen.id});
       }
     else
     {
     setProductDetail({...productDetail, [name]: value });
    }
    }


 const [show, setShow] = useState(false);
    const updateProductDetail = async (e) =>
    {
         e.preventDefault();
         try{
         await ProductDetailService.updateProductDetail(productDetail,id).then(response => {
                if(response.status === 200){
                    setProductDetail(()=>pd_initialState);setUrl(-1);
                    setShow(true);setUpdated(true);
                    setHeader("Success");
                    setMessage("Product Details updated successfully!!!")
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

 const submitProductDetail = async (e) =>
    {
         e.preventDefault();
        try{
         await ProductDetailService.addProductDetail(productDetail).then(response => {
                if(response.status === 200){
                 setProductDetail(()=>pd_initialState);
                 document.getElementById("pid").selectedIndex = 0;
                 document.getElementById("cid").selectedIndex = 0;
                 document.getElementById("vid").selectedIndex = 0;
                 document.getElementById("sc").value='';
                 document.getElementById("tv").value='';
                 console.log(productDetail);
                 setShow(true);
                 setMessage("Product Details added successfully!!!");
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

    return(
    <div>
        <div>
           { show &&
            <ProductDetailToast url={url} setShow={setShow} header={header} message= {message}/>}
        </div>
      <Card >
             <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update product detail" : "Create new product detail"}</Card.Header>
             <Form id="productDetailFormID" onSubmit={id ? updateProductDetail : submitProductDetail} onReset={resetProductDetail}>
             <Card.Body>
              <Form.Group className="mb-3">
                 <Form.Label>Product Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="product" onChange={handleChange} id="pid">
                         <option selected>Select a Product</option>
                           { products.length === 0 ?  <option> Product not added </option> :
                                                                  products.map((product) =><option value={product.productName}>{product.productName}</option>)
                                                                  }
                 </Form.Select>
             </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>Category Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="category"  onChange={handleChange} id="cid">
                      <option selected>Select a Category</option>
                        { categories.length === 0 ?  <option> Category not added </option> :
                                                               categories.map((category) =><option value={category.categoryName}>{category.categoryName}</option>)
                                                               }
                 </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                 <Form.Label>Vendor Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="vendor" onChange={handleChange} id="vid">
                      <option selected>Select a Vendor</option>
                        { vendors.length === 0 ?  <option> Vendors not added </option> :
                                                               vendors.map((vendor) =><option value={vendor.vendorEmail}>{vendor.vendorEmail}</option>)
                                                               }
                     </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Stock Count : </Form.Label>
                 <Form.Control required maxLength={20} type="number" placeholder="Enter product stock count"  name="productStockCount"   onChange={handleChange} id="sc"/>
                 </Form.Group>
             <Form.Group className="mb-3">
                   <Form.Label>Minimum Threshold : </Form.Label>
                  <Form.Control required maxLength={20} type="number" placeholder="Enter minimum threshold value"   name="productThresholdValue" onChange={handleChange} id="tv"/>
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

     </div> );

}

export default ProductDetail;