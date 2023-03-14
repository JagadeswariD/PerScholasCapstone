import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";
import {Alert} from 'react-bootstrap';

const Permission = () =>{
const navigate = useNavigate();
const [authenticated, setAuthenticated] = useState(null);
const [close, setClose]=useState(true);

useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");

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
          <div className="jumbotron jumbotron-fluid">
                   <div className="container">
                     <h1 className="display-4">Permission Denied!!</h1>
                     <p className="lead">You would require Admin role to create or update</p>
                   </div>
                 </div>
         </Alert>)
     );
};
export default Permission;