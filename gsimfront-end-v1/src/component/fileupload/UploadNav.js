import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const UploadNav = () => {
    return(
         <Nav className="justify-content-end" >
                <Nav.Item>
                  <Link to={"uploadFile"} className="nav-link" >Upload Files</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"listFiles"} className="nav-link" >List Files</Link>
                </Nav.Item>
              </Nav>

    );

}

export default UploadNav;