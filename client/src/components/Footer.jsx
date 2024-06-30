import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer bg-light text-center py-3">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">
              &copy; 2024 Artur Lihitskiy. Created for SMART business.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
