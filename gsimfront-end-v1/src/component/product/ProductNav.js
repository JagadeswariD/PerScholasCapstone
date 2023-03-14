import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const ProductNav = () => {
    return(
         <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"addProduct"} className="nav-link" >Add Product</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listProduct"} className="nav-link" default>Product List</Link>
                </Nav.Item>

              </Nav>

    );

}

export default ProductNav;