import {Card, Form, Button,ProgressBar, Alert} from 'react-bootstrap';
import React, {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons'
import UploadService from './UploadService'
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";


const UploadFile = (props) => {

const [file,setFile] = useState();
const [percentage, setPercentage] = useState(0);
const [percShow,setPercShow] = useState(false);
const [message, setMessage] =useState('');
const [show, setShow] = useState(false);
const fileInputRef = useRef(null);
const navigate = useNavigate();

    useEffect(() => {

           const currentUser = AuthService.getCurrentUser();
           if(currentUser=== null){
                navigate("/login");
                window.location.reload();
           }
    },[]);

 const submitFileUpload =async (e) =>
    {
     e.preventDefault();
    try{
     console.log(file);
      let formData = new FormData();
             formData.append("file", file);

      const options = {
           onUploadProgress: (progressEvent) => {
             const {loaded, total} = progressEvent;
             let percent = Math.floor( (loaded * 100) / total )
             console.log( `${loaded}kb of ${total}kb | ${percent}%` );
                if(percent <100)
                {
                        setPercShow(true);
                        setPercentage(percent);
                }
                else
                {
                    setPercShow(false);
                }

             }
         }

       await UploadService.addUpload(formData,options) .then(response => {
                          if(response.status === 200){
                            setMessage(response.data.message);
                            setShow(true);
                            fileInputRef.current.value = null;
                            setFile('');
                          }},(error) => {
                               if(error.response.status===401){
                                    AuthService.logout();
                                    navigate("/home/sessionExpired");
                               }else{
                                   setShow(true);
                                   setMessage(error.response.data.message);
                               }
                         });
      }
       catch (error) {
          console.log(error);
        }
    };
 const resetFileUpload = (e) =>
    {
       fileInputRef.current.value = null;
       setFile('');

    };

const handleChange = ({target:{files}}) =>
{
        setFile(files[0]);
        console.log(files);
};
    return (


        <div> <Card>
                 <Card.Header className="cardHeader"><FontAwesomeIcon icon={faPlusSquare} /> {"File Upload"}</Card.Header>
                 <Form id="productFormID" onSubmit={submitFileUpload} onReset={resetFileUpload}>
                 <Card.Body>

                 {show && (<Alert variant="info" onClose={() => setShow(false)} dismissible>
                         {message}
                       </Alert>)}
                       <Form.Group className="mb-3" controlId="formFileMultiple">
                            <Form.Label>Please select files to be uploaded: </Form.Label>
                            <Form.Control type="file" accept=".zip" onChange={handleChange} ref={fileInputRef} required/>
                       </Form.Group>
                        { percShow && <ProgressBar animated now={percentage}  label={`${percentage}%`}/> }


                 </Card.Body>
                 <Card.Footer style={{"textAlign":"right"}}>
                      <Button className="formButton" variant="primary" type="submit">
                          <FontAwesomeIcon icon={faSave} /> Upload
                      </Button>
                      &nbsp;
                      <Button className="formButton" variant="primary" type="reset">
                           <FontAwesomeIcon icon={faUndo} /> Reset
                      </Button>
                 </Card.Footer>
                  </Form>
               </Card> </div>

);
}
export default UploadFile;