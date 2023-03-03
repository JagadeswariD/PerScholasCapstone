import AuthService from "../authservices/AuthService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logout = () =>{

const navigate = useNavigate();

useEffect(() => {
    AuthService.logout();
    navigate("/login");
    }, []);

    return(
        <div></div>
    );

};

export default Logout;