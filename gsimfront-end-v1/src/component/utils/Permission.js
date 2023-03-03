import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";
import NavigationColumn from "../NavigationColumn";
import {Card, Form, Button, Alert} from 'react-bootstrap';

const Permission = () =>{
const navigate = useNavigate();
const [authenticated, setAuthenticated] = useState(null);
const [close, setClose]=useState(true);

useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    const currentUser = AuthService.getCurrentUser();

    if (loggedInUser) {
    setAuthenticated(loggedInUser);
    if (!authenticated) {
                navigate("/login");}
      else
      {
        window.location.reload();
      }
    }}, []);


    return(
       close && (<Alert key="warning" variant="warning" onClose={() => setClose(false)} dismissible>
          <div class="jumbotron jumbotron-fluid">
                   <div class="container">
                     <h1 class="display-4">Permission Denied!!</h1>
                     <p class="lead">You would require Admin role to create or update</p>
                   </div>
                 </div>
         </Alert>)
     );
};
export default Permission;