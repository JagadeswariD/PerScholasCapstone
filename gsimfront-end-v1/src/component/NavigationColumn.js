import  { Tab, Nav, Row, Col} from 'react-bootstrap';
import { Outlet} from 'react-router-dom';
import CategoryNav from './category/CategoryNav';
import ProductNav from './product/ProductNav';
import ProductDetailNav from './productdetail/ProductDetailNav';
import VendorNav from './vendor/VendorNav';
import VendorMessageNav from './vendormessage/VendorMessageNav';
import UserNav from './user/UserNav';
import UploadNav from './fileupload/UploadNav';
import SchedulerNav from './schedulerAlert/SchedulerNav';
import './css/main.css';

const NavigationColumn = () => {
    return (
<>
    <Tab.Container  justify defaultActiveKey="first" id="navColumn">
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
                <Nav.Item>
                   <Nav.Link eventKey="scheduler" className="navColumn">Scheduler Alert</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="fileupload" className="navColumn">File Upload</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="vendormessage" className="navColumn">Vendor Message</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="categories" id="evt1">
                <CategoryNav/>
                 </Tab.Pane>
                <Tab.Pane eventKey="vendor" id="evt2">
                <VendorNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="products" id="evt3">
                <ProductNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="pdp" id="evt4">
                   <ProductDetailNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="user" id="evt5">
                  <UserNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="scheduler" id="evt6">
                  <SchedulerNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="fileupload" id="evt7">
                  <UploadNav/>
                </Tab.Pane>
                <Tab.Pane eventKey="vendormessage" id="evt7">
                  <VendorMessageNav/>
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