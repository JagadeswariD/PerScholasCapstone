import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const ProductDetailNav = () => {
    return(

     <Nav className="justify-content-end" >
        <Nav.Item>
          <Link to={"listScheduler"} className="nav-link" >Scheduler Alert List</Link>
        </Nav.Item>
     </Nav>

    );

}

export default ProductDetailNav;