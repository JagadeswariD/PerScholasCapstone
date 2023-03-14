import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import SchedulerService from '../schedulerAlert/SchedulerService'
import SessionExpired from '../utils/SessionExpired'
import React, {useState, useEffect} from "react";
import VendorToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const SchedulerAlert = () => {

     const navigate = useNavigate();
     const [role, setRole] = useState();
     const [schedulers, setSchedulers] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);


      useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
                   if(currentUser!= null && AuthService.checkExpirationTime(currentUser)){
                        setRole(currentUser.roles[0]);
                        SchedulerService.getSchedulerAlerts().then((res) =>{
                                setSchedulers( res.data);  },
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



    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = schedulers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(schedulers.length / itemsPerPage);

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
            if(currentPage < Math.ceil(schedulers.length/itemsPerPage))
            {
                setCurrentPage(Math.ceil(schedulers.length/itemsPerPage));
            }
        };

    const nextPage= () => {
        if(currentPage < Math.ceil(schedulers.length/itemsPerPage))
        {
            setCurrentPage(currentPage+1);
        }
    };

    return(
      <div>

     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Scheduler Alert List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>Product Detail ID </th>
                      <th>Product Name</th>
                      <th>Category Name</th>
                      <th>Vendor Name</th>
                      <th>Product Stock Count</th>
                      <th>Limit</th>
                      <th>Creation Date</th>
                    </tr>
                  </thead>
                  <tbody>
                         {
                            schedulers.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Scheduler Alerts Not Available</td>
                            </tr> :
                            currentItems.map((scheduler) =>
                                <tr key={scheduler.id}>
                                    <td>{scheduler.pd_id}</td>
                                    <td>{scheduler.product.productName}</td>
                                    <td>{scheduler.category.categoryName}</td>
                                    <td>{scheduler.vendor.vendorEmail}</td>
                                    <td>{scheduler.productStockCount}</td>
                                    <td>{scheduler.productThresholdValue}</td>
                                    <td>{new Date(scheduler.creationDate).toDateString()}</td>
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

export default SchedulerAlert;