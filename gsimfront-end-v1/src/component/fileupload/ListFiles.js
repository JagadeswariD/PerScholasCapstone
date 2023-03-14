import {Card, Table, ButtonGroup, Button, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import UploadService from './UploadService'
import React, {useState, useEffect} from "react";
import UploadToast from '../utils/MyToast'
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";

const ListFiles = () => {

     const navigate = useNavigate();
     const [role, setRole] = useState();
     const [files, setFiles] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage]= useState(5);

      useEffect(() => {
       const currentUser = AuthService.getCurrentUser();
                   if(currentUser!= null){

                        setRole(currentUser.roles);
                         UploadService.getFiles().then((res) =>{
                              setFiles( res.data); },
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

   const deleteFile = async (Id) => {
        try{
             await UploadService.deleteFile(Id).then((res) => {

            if(res.data != null){
                console.log(res.data);
                setShow(true);
                setFiles(files.filter((File)=> File.id !== Id));
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
        const currentItems = files.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(files.length / itemsPerPage);

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
                if(currentPage < Math.ceil(files.length/itemsPerPage))
                {
                    setCurrentPage(Math.ceil(files.length/itemsPerPage));
                }
            };

        const nextPage= () => {
            if(currentPage < Math.ceil(files.length/itemsPerPage))
            {
                setCurrentPage(currentPage+1);
            }
        };


    return(
     <div>
            <div>
               { show &&
                <UploadToast  setShow={setShow} header="Success" message="File deleted successfully!!!"/>}
            </div>
     <Card>
      <Card.Header className="cardHeader"><FontAwesomeIcon icon={faList} /> Image File List</Card.Header>
      <Card.Body>
             <Table striped>
                  <thead>
                    <tr>

                      <th>Image File Name</th>
                      <th>File Path</th>
                      <th>Creation Date</th>
                      {role == "ROLE_ADMIN" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                         {
                            files.length === 0 ?
                            <tr align="center">
                                <td colSpan = "7"> Image File Details Not Added</td>
                            </tr> :
                            currentItems.map((file) =>
                                <tr key={file.id}>

                                    <td>{file.fileName}</td>
                                    <td>{file.filePath}</td>
                                    <td>{new Date(file.creationDate).toDateString()}</td>
                                   {role == "ROLE_ADMIN" &&
                                    <td>
                                        <ButtonGroup>
                                             <Button variant="outline-danger"  onClick={() => deleteFile(file.id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
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

export default ListFiles;