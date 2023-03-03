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


const navigate = useNavigate();


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
        if(currentUser.roles == "ROLE_USER"){
                    navigate("/home/permission");
              }
      }
      else
      {
       navigate("/login");
      }

        if(id){
               productDetailById(id);
        }

        ProductService.getProducts().then((res) =>{setProducts( res.data); });
        VendorService.getVendors().then((res) =>{setVendors( res.data); });
        CategoryService.getCategories().then((res) =>{setCategories( res.data); });

      }, []);

const productDetailById = (id) => {
        ProductDetailService.getProductDetailByID(id)
            .then(res => {
                    if(res.data!= null){
                       const pd_upinitialState = {
                                     pdid:res.data.id,
                                     vendorid: res.data.vendor.id,
                                     categoryid: res.data.category.id,
                                     productid: res.data.product.id,
                                     productStockCount :res.data.productStockCount,
                                     productThresholdValue : res.data.productThresholdValue,
                                  };
                            // console.log(pd_upinitialState);
                             document.getElementById("pid").value=res.data.product.productName;
                             document.getElementById("cid").value=res.data.category.categoryName;
                             document.getElementById("vid").value=res.data.vendor.vendorEmail;
                             document.getElementById("sc").value=res.data.productStockCount;
                             document.getElementById("tv").value=res.data.productThresholdValue;
                          setProductDetail(pd_upinitialState);
                        // console.log(productDetail)
                    }
            })
  };
const handleChange = event => {

     const { name, value } = event.target
     if(name === 'product' && value != "Select a product"){
        const findProd = products.find(product => product.productName === value);
        setProductDetail({...productDetail, "productid" : findProd.id });
      }
     else if(name === 'category' && value != "Select a category"){
             const findCat = categories.find(category => category.categoryName === value);
             setProductDetail({ ...productDetail, "categoryid" : findCat.id });

       }
      else if(name === 'vendor' && value != "Select a vendor"){
            const findVen = vendors.find(vendor => vendor.vendorEmail === value);
           setProductDetail({ ...productDetail, ["vendorid"] : findVen.id});
       }
     else
     {
     setProductDetail({...productDetail, [name]: value })
    }
    }


 const [show, setShow] = useState(false);
    const updateProductDetail = (e) =>
    {
         e.preventDefault();
         console.log(productDetail);
        ProductDetailService.updateProductDetail(productDetail,id)
            .then(response => {
                if(response.data != null){
                    setProductDetail(()=>pd_initialState);
                    setShow(true);

                }
                else
                {
                    setShow(false);
                }
            });
    }

 const submitProductDetail = (e) =>
    {
        e.preventDefault();
         ProductDetailService.addProductDetail(productDetail)
            .then(response => {
                if(response.data != null){
                    setProductDetail(pd_initialState);

                    setShow(true);

                }
                else
                {
                    setShow(false);
                }
            });
    }

    return(
    <div>
        <div>
           { show &&
            <ProductDetailToast  header="Success" message= {id ? "Product detail updated successfully!!!" : "Product detail added successfully!!!"}/>}
        </div>
      <Card >
             <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update product detail" : "Create new product detail"}</Card.Header>
             <Form id="productDetailFormID" onSubmit={id ? updateProductDetail : submitProductDetail} onReset={resetProductDetail}>
             <Card.Body>
              <Form.Group className="mb-3">
                 <Form.Label>Product Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="product" onChange={handleChange} id="pid">
                         <option>Select a Product</option>
                           { products.length === 0 ?  <option> Product not added </option> :
                                                                  products.map((product) =><option value={product.productName}>{product.productName}</option>)
                                                                  }
                 </Form.Select>
             </Form.Group>
             <Form.Group className="mb-3">
                <Form.Label>Category Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="category"  onChange={handleChange} id="cid">
                      <option>Select a Category</option>
                        { categories.length === 0 ?  <option> Product not added </option> :
                                                               categories.map((category) =><option value={category.categoryName}>{category.categoryName}</option>)
                                                               }
                 </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                 <Form.Label>Vendor Name : </Form.Label>
                 <Form.Select aria-label="Default select example" name="vendor" onChange={handleChange} id="vid">
                      <option>Select a Vendor</option>
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

     </div> );

}

export default ProductDetail;