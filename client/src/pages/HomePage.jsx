import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Welcome to the "Out of Office" Solution</h1>
          <p>
            Manage your employees, projects, leave requests, and approval
            requests efficiently. Please log in or register to access the
            system.
          </p>
          <div className="mt-4">
            <Link to="/login">
              <Button variant="primary" className="mx-2">
                Login
              </Button>
            </Link>
            <Link to="/registration">
              <Button variant="secondary" className="mx-2">
                Register
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
