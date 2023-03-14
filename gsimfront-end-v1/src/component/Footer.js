import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
    const curYear = new Date().getFullYear();


  return (
    <Navbar fixed="bottom" bg="light" variant="light">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
             &copy; {curYear}-{curYear + 1}, GSIM
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};
export default Footer;