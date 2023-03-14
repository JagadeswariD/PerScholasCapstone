import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const VendorMessageNav = () => {

    return(
         <Nav className="justify-content-end" >

                <Nav.Item>
                  <Link to={"listVendorMessage"} className="nav-link" default>Vendor Message List</Link>
                </Nav.Item>

              </Nav>

    );

}

export default VendorMessageNav;