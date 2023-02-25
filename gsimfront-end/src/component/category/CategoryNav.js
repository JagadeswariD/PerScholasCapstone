import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Category from './Category';

const CategoryNav = () => {
    return(
  <>
         <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"addCategory"} className="nav-link" >Add Category</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listCategory"} className="nav-link" default>Category List</Link>
                </Nav.Item>

              </Nav>
              <Routes>
                      <Route path = "/editCategory/:id" exact  element={<Category/>}/>
             </Routes>
</>
    );

}

export default CategoryNav;