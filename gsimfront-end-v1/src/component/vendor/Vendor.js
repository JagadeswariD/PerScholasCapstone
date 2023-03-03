import {Card, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import VendorService from './VendorService'
import VendorToast from '../utils/MyToast'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const Vendor = (props) => {

const navigate = useNavigate();
const [role, setRole] = useState();
const [state, setState]=useState(false);

    const initialState = {
        id:'',
         vendorFirstName :'',
         vendorLastName : '',
         vendorEmail : '',
         vendorStatus: false
    };
     const [vendor, setVendor] = useState(initialState);
    const resetVendor = (e) =>
    {
        setVendor(()=>initialState);

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
                        vendorById(id);
                }

          }, []);

  const vendorById = (id) => {
        VendorService.getVendorByID(id)
            .then(res => {
                    if(res.data!= null){
                        setVendor(res.data);
                    }
            })
  };

  const [show, setShow] = useState(false);
    const updateVendor = (e) =>
    {
        e.preventDefault();
        VendorService.updateVendor(vendor,id)
            .then(response => {
                if(response.data != null){
                    setVendor(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }

 const submitVendor = (e) =>
    {
        e.preventDefault();
        VendorService.addVendor(vendor)
            .then(response => {
                if(response.data != null){
                    setVendor(()=>initialState);
                    setShow(true);
                }
                else
                {
                    setShow(false);
                }
            });
    }
 const handleChange = event => {
        if(event.target.name === 'vendorStatus'){
         if(event.target.checked){
            setVendor({...vendor, [event.target.name]: event.target.checked})
        }
        else{
            setVendor({...vendor, [event.target.name]: false})
        }
        }
        else
        {
             const { name, value } = event.target
             setVendor({...vendor, [name]: value })
        }
    }




    return(

    <div>
        <div>
           { show &&
            <VendorToast  header="Success" message= {id ? "Vendor updated successfully!!!" : "Vendor added successfully!!!"}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update Vendor" : "Create New Vendor"}</Card.Header>
                <Form id="vendorFormID" onSubmit={id ? updateVendor : submitVendor} onReset={resetVendor}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control required maxLength={20} type="text" placeholder="Enter vendor first name"  name="vendorFirstName"  value={vendor.vendorFirstName} onChange={handleChange}/>
                       </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required maxLength={20} type="text" placeholder="Enter vendor last name" name="vendorLastName" value={vendor.vendorLastName} onChange={handleChange}/>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control required maxLength={50} type="email" placeholder="Enter vendor email" name="vendorEmail" value={vendor.vendorEmail} onChange={handleChange}/>
                             <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                             </Form.Text>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Status" name="vendorStatus"  checked={vendor.vendorStatus} value={vendor.vendorStatus}  onChange={handleChange}/>
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

export default Vendor;