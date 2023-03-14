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

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [url,setUrl] = useState(null);
const [updated,setUpdated] = useState(false);
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
                        vendorById(id);
                }

          }, []);

  const vendorById = async (id) => {
        try{
             await VendorService.getVendorByID(id).then(response => {
                    if(response.status === 200){
                        setVendor(response.data);
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
    const updateVendor = async (e) =>
    {
        e.preventDefault();
        try{
            await VendorService.updateVendor(vendor,id).then(response => {
                if(response.status === 200){
                    setVendor(()=>initialState);setUrl(-1);
                    setShow(true);setUpdated(true);
                    setHeader("Success");
                    setMessage("Vendor updated successfully!!!")
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

 const submitVendor = async (e) =>
    {
        e.preventDefault();
        try{
            await VendorService.addVendor(vendor).then(response => {
                if(response.status === 200){
                    setVendor(()=>initialState);
                    setShow(true);
                    setMessage("Vendor added successfully!!!");
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
            <VendorToast url={url} header={header} setShow={setShow} message= {message}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update Vendor" : "Create New Vendor"}</Card.Header>
                <Form id="vendorFormID" onSubmit={id ? updateVendor : submitVendor} onReset={resetVendor}>
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Form.Label>First Name</Form.Label>
                           <Form.Control required maxLength={20} type="text" placeholder="Enter vendor first name"  name="vendorFirstName"  value={vendor.vendorFirstName} onChange={handleChange} autoComplete="off"/>
                       </Form.Group>
                       <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required maxLength={20} type="text" placeholder="Enter vendor last name" name="vendorLastName" value={vendor.vendorLastName} onChange={handleChange} autoComplete="off"/>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formBasicEmail">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control required maxLength={250} type="email" placeholder="Enter vendor email" name="vendorEmail" value={vendor.vendorEmail} onChange={handleChange} autoComplete="off"/>
                             <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                             </Form.Text>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Status" name="vendorStatus"  checked={vendor.vendorStatus} value={vendor.vendorStatus}  onChange={handleChange} autoComplete="off"/>
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

export default Vendor;