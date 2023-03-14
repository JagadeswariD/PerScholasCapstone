import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import VendorService from './VendorService'
import React, {useState, useEffect} from "react";
import VendorToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const VendorList = () => {

     const navigate = useNavigate();
     const [role, setRole] = useState();
     const [vendors, setVendors] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);


      useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
                   if(currentUser!= null){

                        setRole(currentUser.roles[0]);
                          VendorService.getVendors().then((res) =>{
                                  setVendors( res.data);  },
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

   const deleteVendor = async (Id) => {
         try{
             await VendorService.deleteVendor(Id).then((res) => {
                if(res.data != null){
                     setShow(true);
                     setVendors(vendors.filter((vendor)=> vendor.id !== Id));
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
    const currentItems = vendors.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(vendors.length / itemsPerPage);

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
            if(currentPage < Math.ceil(vendors.length/itemsPerPage))
            {
                setCurrentPage(Math.ceil(vendors.length/itemsPerPage));
            }
        };

    const nextPage= () => {
        if(currentPage < Math.ceil(vendors.length/itemsPerPage))
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
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Vendor List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Creation Date</th>
                      <th>Modified Date</th>
                      {role == "ROLE_ADMIN" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                         {
                            vendors.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Vendors Not Available</td>
                            </tr> :
                            currentItems.map((vendor) =>
                                <tr key={vendor.id}>

                                    <td>{vendor.vendorFirstName}</td>
                                    <td>{vendor.vendorLastName}</td>
                                    <td>{vendor.vendorEmail}</td>
                                    <td>{(vendor.vendorStatus) ? "Active" : "Inactive"}</td>
                                    <td>{new Date(vendor.creationDate).toDateString()}</td>
                                    <td>{new Date(vendor.modifiedDate).toDateString()}</td>
                                    {role == "ROLE_ADMIN" &&
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"editVendor/"+vendor.id} className="btn btn-outline-warning" ><FontAwesomeIcon icon={faEdit} /> </Link>
                                            <Button variant="outline-danger"  onClick={() => deleteVendor(vendor.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
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

export default VendorList;