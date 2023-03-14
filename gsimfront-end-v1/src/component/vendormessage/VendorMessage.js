import {Card, Form, Button,Row,Col} from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import VendorMessageService from './VendorMessageService'
import VendorToast from '../utils/MyToast'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const VendorMessage = (props) => {

const [message, setMessage] = useState();
const [header, setHeader] = useState();
const navigate = useNavigate();
const [url,setUrl] = useState(null);
const [updated,setUpdated] = useState(false);
 const initialState = {
        id:'',
         productName :'',
         vendorName : '',
         vendorEmail : '',
         stockCount: 0,
         pricePerBox: 0.0,
         stockPrice: 0.0,
         currency: '',
         tax:0.0,
         finalAmount: 0.0,
         status:''

    };
const [vendorMessage, setVendorMessage] = useState(initialState);


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
                        vendorMessageById(id);
                }

          }, []);

  const vendorMessageById = async (id) => {
        try{
             await VendorMessageService.getVendorMessageByID(id).then(response => {
                    if(response.status === 200){
                        setVendorMessage(response.data);
                        console.log(vendorMessage);
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
    const updateVendorMessage = async (e) =>
    {
        e.preventDefault();
        try{
            await VendorMessageService.updateVendorMessage(vendorMessage,id).then(response => {
                if(response.status === 200){
                    setUrl(-1);
                    setShow(true);setUpdated(true);
                    setHeader("Success");
                    setMessage("Vendor Message updated successfully!!!")
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


 const handleChange = event => {

     const { name, value } = event.target
     setVendorMessage({...vendorMessage, [name]: value })

    }


    return(

    <div>
        <div>
           { show &&
            <VendorToast url={url} header={header} setShow={setShow} message= {message}/>}
        </div>
          <Card>
                <Card.Header className="cardHeader"><FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Update Vendor" : "Create New Vendor"}</Card.Header>
                <Form id="vendorMessageFormID" onSubmit={updateVendorMessage} >
                <Card.Body>
                      <Form.Group className="mb-3">
                           <Row><Col>
                           <Form.Label>Product Name</Form.Label>
                           <Form.Control required maxLength={20} type="text" disabled={true}  name="vendorMessageProductName"  value={vendorMessage.productName} onChange={handleChange} autoComplete="off"/>
                           </Col><Col>
                           <Form.Label>Vendor Email</Form.Label>
                           <Form.Control required maxLength={20} type="email" disabled={true}  name="vendorMessageEmail" value={vendorMessage.vendorEmail} onChange={handleChange} autoComplete="off"/>
                           </Col></Row>
                       </Form.Group>
                       <Form.Group className="mb-3">
                            <Row><Col>
                            <Form.Label>Stock Count</Form.Label>
                            <Form.Control required maxLength={250} type="text" disabled={true}  name="vendorMessageStockCount" value={vendorMessage.stockCount}  autoComplete="off"/>
                            </Col><Col>
                            <Form.Label>Price Per Box</Form.Label>
                            <Form.Control required maxLength={250} type="text" disabled={true} name="vendorMessagePricePerBox" value={vendorMessage.pricePerBox} autoComplete="off"/>
                            </Col></Row>
                       </Form.Group>
                       <Form.Group className="mb-3">
                               <Row><Col>
                               <Form.Label>Stock Price</Form.Label>
                               <Form.Control required maxLength={250} type="text" disabled={true} name="vendorMessageStockPrice" value={vendorMessage.stockPrice} autoComplete="off"/>
                               </Col><Col>
                               <Form.Label>Currency</Form.Label>
                               <Form.Control required maxLength={250} type="text" disabled={true}  name="vendorMessageCurrency" value={vendorMessage.currency}  autoComplete="off"/>
                               </Col></Row>
                          </Form.Group>
                       <Form.Group className="mb-3">
                              <Row><Col>
                              <Form.Label>Tax</Form.Label>
                              <Form.Control required maxLength={250} type="text"  disabled={true} name="vendorMessageTax" value={vendorMessage.tax}  autoComplete="off"/>
                              </Col><Col>
                              <Form.Label>Final Amount</Form.Label>
                              <Form.Control required maxLength={250} type="text" disabled={true}  name="vendorMessageFinalAmount" value={vendorMessage.finalAmount}  autoComplete="off"/>
                              </Col></Row>
                         </Form.Group>
                       <Form.Group className="mb-3">
                              <Form.Label>Status</Form.Label>
                               <Form.Control required maxLength={250} type="text"  name="vendorMessageStatus" value={vendorMessage.status} disabled={true} autoComplete="off"/>
                        </Form.Group>

                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                     <Button className="formButton" variant="primary" type="submit" disabled={updated ? 1 : 0}>
                         <FontAwesomeIcon icon={faSave} /> {id ? "Approve" : "Submit"}
                     </Button>
                </Card.Footer>
                 </Form>
              </Card>
     </div>
    );

}

export default VendorMessage;