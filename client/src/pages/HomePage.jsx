import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function App() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Welcome to the "Out of Office" Solution</h1>
          <p>
            Effectively manage employees, projects, vacation requests, and
            approval requests. Please select your role to access the system.
          </p>
          <Row className="mt-4">
            <Col xs={12} className="mb-2">
              <Link to="/dashboard/HR">
                <Button variant="primary" className="w-50">
                  HR - manager
                </Button>
              </Link>
            </Col>
            <Col xs={12} className="mb-2">
              <Link to="/dashboard/ProjectManager">
                <Button variant="primary" className="w-50">
                  Project manager
                </Button>
              </Link>
            </Col>
            <Col xs={12} className="mb-2">
              <Link to="/dashboard/Employee">
                <Button variant="primary" className="w-50">
                  Employee
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
