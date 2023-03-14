import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import VendorMessageService from './VendorMessageService'
import React, {useState, useEffect} from "react";
import VendorToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const VendorMessageList = () => {

     const navigate = useNavigate();
     const [role, setRole] = useState();
     const [vendorMessages, setVendorMessages] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);


      useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
                   if(currentUser!= null){

                        setRole(currentUser.roles[0]);
                          VendorMessageService.getVendorMessages().then((res) =>{
                                  setVendorMessages( res.data);  },
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

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = vendorMessages.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(vendorMessages.length / itemsPerPage);

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
            if(currentPage < Math.ceil(vendorMessages.length/itemsPerPage))
            {
                setCurrentPage(Math.ceil(vendorMessages.length/itemsPerPage));
            }
        };

    const nextPage= () => {
        if(currentPage < Math.ceil(vendorMessages.length/itemsPerPage))
        {
            setCurrentPage(currentPage+1);
        }
    };

    return(
      <div>
            <div>
               { show &&
                <VendorToast  header="Success" setShow={setShow} message="Vendor deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Vendor Message List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Vendor Email</th>
                      <th>Stock Count</th>
                      <th>Price Per Box</th>
                      <th>Stock Price</th>
                      <th>Tax</th>
                      <th>Final Amount</th>
                      <th>Created Date</th>
                      <th>Modified Date</th>
                      {role == "ROLE_ADMIN" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                         {
                            vendorMessages.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> VendorMessage Not Available</td>
                            </tr> :
                            currentItems.map((vendorMessage) =>
                                <tr key={vendorMessage.id}>

                                    <td>{vendorMessage.productName}</td>
                                    <td>{vendorMessage.vendorEmail}</td>
                                    <td>{vendorMessage.stockCount}</td>
                                    <td>{vendorMessage.pricePerBox}</td>
                                    <td>{vendorMessage.stockPrice}</td>
                                    <td>{vendorMessage.currency}</td>
                                    <td>{vendorMessage.tax}</td>
                                    <td>{vendorMessage.finalAmount}</td>
                                    <td>{vendorMessage.status}</td>
                                    <td>{new Date(vendorMessage.creationDate).toDateString()}</td>
                                    <td>{new Date(vendorMessage.modifiedDate).toDateString()}</td>
                                    {role == "ROLE_ADMIN" &&
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editVendorMessage/"+vendorMessage.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>

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

export default VendorMessageList;