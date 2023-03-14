import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./authservices/AuthService";
import NavigationColumn from "./NavigationColumn";
import { redirect } from "react-router-dom";

const Home = () =>{
const navigate = useNavigate();
const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
        }
    else
    {
        navigate("/login");
        window.location.reload();
    }
 }, []);


    return(
       <NavigationColumn/>


     );
};
export default Home;