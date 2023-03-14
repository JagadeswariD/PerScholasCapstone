import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Category from './Category';
import CategoryList from './CategoryList';
const CategoryNav = () => {
    return(
   <>
               <Nav className="justify-content-end">
                 <Nav.Item>
              	 <Link to={"addCategory"} className="nav-link" >Add Category</Link>
                 </Nav.Item>
                 <Nav.Item>
              	 <Link to={"listCategory"} className="nav-link" default>Category List</Link>
                 </Nav.Item>

               </Nav>

   </>
    );

}

export default CategoryNav;