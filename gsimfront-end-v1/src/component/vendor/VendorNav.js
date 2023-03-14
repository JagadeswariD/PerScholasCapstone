import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const VendorNav = () => {

    return(
         <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"addVendor"} className="nav-link" >Add Vendor</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listVendor"} className="nav-link" default>Vendor List</Link>
                </Nav.Item>

              </Nav>

    );

}

export default VendorNav;