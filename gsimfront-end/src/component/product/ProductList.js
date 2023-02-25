import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import ProductService from './ProductService'
import React, {useState, useEffect} from "react";
import ProductToast from './ProductToast'
import {Link} from 'react-router-dom';

const ProductList = () => {

     const [products, setProducts] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);

      useEffect(() => {
          ProductService.getProducts().then((res) =>{
                         setProducts( res.data);

                 });
       }, [])

     const [show, setShow] = useState(false);

   const deleteProduct = (Id) => {
         ProductService.deleteProduct(Id).then((res) => {
            if(res.data != null){
                 setShow(true);
                 setProducts(products.filter((Product)=> Product.id !== Id));
            }
            else
            {
                setShow(false);
            }
         })
    };

    const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        const currentItems = products.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(products.length / itemsPerPage);

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
                if(currentPage < Math.ceil(products.length/itemsPerPage))
                {
                    setCurrentPage(Math.ceil(products.length/itemsPerPage));
                }
            };

        const nextPage= () => {
            if(currentPage < Math.ceil(products.length/itemsPerPage))
            {
                setCurrentPage(currentPage+1);
            }
        };


    return(
     <div>
            <div>
               { show &&
                <ProductToast  header="Success" message="Product deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Product List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Creation Date</th>
                      <th>Modified Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                         {
                            products.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Product Details Not Added</td>
                            </tr> :
                            currentItems.map((product) =>
                                <tr key={product.id}>

                                    <td>{product.productName}</td>
                                    <td>{product.productDescription}</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"/editProduct/"+product.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                                            <Button variant="outline-danger"  onClick={() => deleteProduct(product.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
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

export default ProductList;