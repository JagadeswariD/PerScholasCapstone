import  { Tab, Nav, Row, Col} from 'react-bootstrap';
import VendorNav from './vendor/VendorNav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Vendor from './vendor/Vendor';
import VendorList from './vendor/VendorList';
import Category from './category/Category';
import CategoryList from './category/CategoryList';
import CategoryNav from './category/CategoryNav';
import Product from './product/Product';
import ProductList from './product/ProductList';
import ProductNav from './product/ProductNav';

import '../css/main.css';

const NavigationColumn = () => {

    return (
    <Router>
    <Tab.Container  justify defaultActiveKey="first" >
     <Row>
      <Col sm={3}>
              <Nav  variant="tabs" className="flex-column" >
                <Nav.Item >
                  <Nav.Link eventKey="categories" className="navColumn">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="vendor" className="navColumn" >Vendor</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="products" className="navColumn" >Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="pdp" className="navColumn">PDP</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="categories">
                <CategoryNav/>
                 <Routes>
                            <Route path = "/addCategory" exact  element={<Category/>}/>
                            <Route path = "/listCategory" exact  element={<CategoryList/>}/>
                   </Routes>
                 </Tab.Pane>
                <Tab.Pane eventKey="vendor">
                   <VendorNav/>
                   <Routes>
                            <Route path = "/addVendor" exact  element={<Vendor/>}/>
                            <Route path = "/listVendor" exact  element={<VendorList/>}/>
                   </Routes>
                </Tab.Pane>
                <Tab.Pane eventKey="products">
                      <ProductNav/>
                      <Routes>
                               <Route path = "/addProduct" exact  element={<Product/>}/>
                               <Route path = "/listProduct" exact  element={<ProductList/>}/>
                      </Routes>
                </Tab.Pane>
                <Tab.Pane eventKey="pdp">
                   Hii, I am 4st tab content
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
</Router>

      );
}
export default NavigationColumn;