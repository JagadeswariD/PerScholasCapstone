import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../authservices/AuthService";
import { Alert} from 'react-bootstrap';

const SessionExpired = () =>{
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
          <div className="jumbotron jumbotron-fluid">
                   <div className="container">
                     <h1 className="display-4">Session Expired!!</h1>
                     <p className="lead">Please re-login to access the page</p>
                   </div>
                 </div>
         </Alert>)
     );
};
export default SessionExpired;