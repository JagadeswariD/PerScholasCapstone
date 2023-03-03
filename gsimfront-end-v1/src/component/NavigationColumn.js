import  { Tab, Nav, Row, Col} from 'react-bootstrap';
import { Outlet} from 'react-router-dom';
import CategoryNav from './category/CategoryNav';
import ProductNav from './product/ProductNav';
import ProductDetailNav from './productdetail/ProductDetailNav';
import VendorNav from './vendor/VendorNav';
import UserNav from './user/UserNav';
import './css/main.css';

const NavigationColumn = () => {

    return (
<>
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
                <Nav.Item>
                   <Nav.Link eventKey="user" className="navColumn">Users</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="categories">
                <CategoryNav/>
                 </Tab.Pane>
                <Tab.Pane eventKey="vendor">
                <VendorNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="products">
                <ProductNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="pdp">
                   <ProductDetailNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="user">
                  <UserNav/>
                </Tab.Pane>
              </Tab.Content>
              <Outlet/>
            </Col>
          </Row>
        </Tab.Container>

         </>

      );
}
export default NavigationColumn;