import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const ProductDetailNav = () => {
    return(
         <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"addProductDetail"} className="nav-link" >Add Product Detail</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listProductDetail"} className="nav-link" default>Product Detail List</Link>
                </Nav.Item>

              </Nav>

    );

}

export default ProductDetailNav;