import './App.css';
import NavigationBar from './component/NavigationBar';
import Footer from './component/Footer';
import Login from './component/user/Login';
import Logout from './component/user/Logout';
import Register from './component/user/Register';
import Home from './component/Home.js'
import SessionExpired from './component/utils/SessionExpired.js'
import Permission from './component/utils/Permission.js'
import Category from './component/category/Category';
import CategoryList from './component/category/CategoryList';
import Product from './component/product/Product';
import ProductList from './component/product/ProductList';
import ProductDetail from './component/productdetail/ProductDetail';
import ProductDetailList from './component/productdetail/ProductDetailList';
import Vendor from './component/vendor/Vendor';
import VendorList from './component/vendor/VendorList';
import VendorMessage from './component/vendormessage/VendorMessage';
import VendorMessageList from './component/vendormessage/VendorMessageList';
import SchedulerAlert from './component/schedulerAlert/SchedulerAlert';
import User from './component/user/User';
import UserList from './component/user/UserList';
import UploadFile from './component/fileupload/UploadFile';
import ListFiles from './component/fileupload/ListFiles';
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom';
import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import AuthService from "./component/authservices/AuthService";

function App() {
const [currentUser, setCurrentUser] = useState(undefined);
const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setAuthenticated(true);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    return redirect("/login");
    window.location.reload();
  };


  return (
  <div className="wrapper">
    <Navbar bg="light" variant="light" >
        <Container>
                 <Navbar.Brand href="">
                 <FontAwesomeIcon icon={faCartShopping} />
                 Grocery Store Inventory Management</Navbar.Brand>
                 {authenticated  && (
                       <Nav className="ms-auto" >
                       <Nav.Link>
                       Welcome {currentUser.username}
                       </Nav.Link>
                       <Nav.Link href={"/login"} onClick={logOut} >Log out</Nav.Link>
                       </Nav>
                     )}
                     {!authenticated && (
                 <Nav className="ms-auto" >
                   <Nav.Link href={"/login"}>Sign In</Nav.Link> <Nav.Link>/</Nav.Link>
                   <Nav.Link href={"/register"}>Sign Up</Nav.Link>
                 </Nav>)}

         </Container>
     </Navbar>
     <Navbar style={{"backgroundColor": "#444680"}}>
          <Container>

           </Container>
       </Navbar>
       <div className="container mt-3">
       <Routes>
              <Route path="/register" exact element={<Register/>} />
              <Route path="/login" exact element={<Login/>} />
              <Route path="/" exact element={<Home/>} />
              <Route path="/home" element={<Home/>} >
                  <Route path = "/home/addCategory" exact  element={<Category/>}/>
                  <Route path = "/home/listCategory" exact  element={<CategoryList/>}/>
                  <Route path = "/home/listCategory/editCategory/:id" exact  element={<Category/>}/>
                  <Route path = "/home/addProduct" exact  element={<Product/>}/>
                  <Route path = "/home/listProduct" exact  element={<ProductList/>}/>
                  <Route path = "/home/listProduct/editProduct/:id" exact  element={<Product/>}/>
                  <Route path = "/home/addProductDetail" exact  element={<ProductDetail/>}/>
                  <Route path = "/home/listProductDetail" exact  element={<ProductDetailList/>}/>
                  <Route path = "/home/listProductDetail/editProductDetail/:id" exact  element={<ProductDetail/>}/>
                  <Route path = "/home/addVendor" exact  element={<Vendor/>}/>
                  <Route path = "/home/listVendor" exact  element={<VendorList/>}/>
                  <Route path = "/home/listVendorMessage" exact  element={<VendorMessageList/>}/>
                  <Route path = "/home/listVendorMessage/editVendorMessage/:id" exact  element={<VendorMessage/>}/>
                  <Route path = "/home/listVendor/editVendor/:id" exact  element={<Vendor/>}/>
                  <Route path = "/home/addUser" exact  element={<User/>}/>
                  <Route path = "/home/listUser" exact  element={<UserList/>}/>
                  <Route path = "/home/listScheduler" exact  element={<SchedulerAlert/>}/>
                  <Route path = "/home/listUser/editUser/:id" exact  element={<User/>}/>
                   <Route path = "/home/uploadFile" exact  element={<UploadFile/>}/>
                   <Route path = "/home/listFiles" exact  element={<ListFiles/>}/>
                  <Route path="/home/permission" exact element={<Permission/>} />
                  <Route path="/home/sessionExpired" exact element={<SessionExpired/>} />
                </Route>
       </Routes>
       </div>
    <Footer/>
    </div>
  );
}

export default App;
