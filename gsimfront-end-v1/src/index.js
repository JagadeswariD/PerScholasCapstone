import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './component/user/Login';
import Logout from './component/user/Logout';
import Register from './component/user/Register';
import Home from './component/Home.js'
import Permission from './component/utils/Permission.js'
import Category from './component/category/Category';
import CategoryList from './component/category/CategoryList';
import Product from './component/product/Product';
import ProductList from './component/product/ProductList';
import ProductDetail from './component/productdetail/ProductDetail';
import ProductDetailList from './component/productdetail/ProductDetailList';
import Vendor from './component/vendor/Vendor';
import VendorList from './component/vendor/VendorList';
import User from './component/user/User';
import UserList from './component/user/UserList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  <Router>
          <Routes>
              <Route path="/register" exact element={<Register/>} />
              <Route path="/login" exact element={<Login/>} />
              <Route path="/logout" exact element={<Logout/>}/>
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
                  <Route path = "/home/listVendor/editVendor/:id" exact  element={<Vendor/>}/>
                  <Route path = "/home/addUser" exact  element={<User/>}/>
                  <Route path = "/home/listUser" exact  element={<UserList/>}/>
                  <Route path = "/home/listUser/editUser/:id" exact  element={<User/>}/>
                  <Route path="/home/permission" exact element={<Permission/>} />
                </Route>
           </Routes>

    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
