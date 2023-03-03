import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./authservices/AuthService";
import NavigationColumn from "./NavigationColumn";


const Home = () =>{
const navigate = useNavigate();
const [authenticated, setAuthenticated] = useState(null);

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
        <NavigationColumn/>
     );
};
export default Home;