import {Card, Table, ButtonGroup, Button, InputGroup, Row, Col, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import ProductDetailService from './ProductDetailService'
import React, {useState, useEffect} from "react";
import ProductToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const ProductDetailList = () => {

     const navigate = useNavigate();
     const [role, setRole] = useState();
     const [productDetails, setProductDetails] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);


      useEffect(() => {
       const currentUser = AuthService.getCurrentUser();
                   if(currentUser!= null){

                        setRole(currentUser.roles);
                         ProductDetailService.getProductDetails().then((res) =>{
                                                  setProductDetails( res.data); });
                   }
                   else
                   {
                    navigate("/login");
                    }

       }, [])

     const [show, setShow] = useState(false);

   const deleteProductDetail = (Id) => {
         ProductDetailService.deleteProductDetail(Id).then((res) => {
            if(res.data != null){
                 setShow(true);
                 setProductDetails(productDetails.filter((ProductDetail)=> ProductDetail.id !== Id));
            }
            else
            {
                setShow(false);
            }
         })
    };

    const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        const currentItems = productDetails.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(productDetails.length / itemsPerPage);

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
                if(currentPage < Math.ceil(productDetails.length/itemsPerPage))
                {
                    setCurrentPage(Math.ceil(productDetails.length/itemsPerPage));
                }
            };

        const nextPage= () => {
            if(currentPage < Math.ceil(productDetails.length/itemsPerPage))
            {
                setCurrentPage(currentPage+1);
            }
        };


    return(
     <div>
            <div>
               { show &&
                <ProductToast  header="Success" message="Product Detail deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Product Detail List</Card.Header>
      <Card.Body>
      <div className="displayGrid">
      {
          productDetails.length === 0 ?

            <h4>Product Details Not Added</h4>

          :
           currentItems.map((productDetails) =>
             <Card style={{ width: '15rem' }} key={productDetails.id}>
                  <Card.Img variant="top" src={window.location.origin + '/img/P1.png'} />
                  <Card.Body>
                    <Card.Title>{productDetails.product.productName}</Card.Title>
                    <Card.Text>
                      Category Name : {productDetails.category.categoryName} <br/>
                      Vendor Name : {productDetails.vendor.vendorFirstName}<br/>
                      Product Description: {productDetails.product.description}<br/>

                      Product Stock Count: {productDetails.productStockCount} <br/>
                      Limit: {productDetails.productThresholdValue}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="justify-content-end">
                    <ButtonGroup >
                        <Link to={"editProductDetail/"+productDetails.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                        <Button variant="outline-danger"  onClick={() => deleteProductDetail(productDetails.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
                    </ButtonGroup>
                  </Card.Footer>
                </Card>)

                }
                </div>
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

export default ProductDetailList;