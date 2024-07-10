import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  FaUsers,
  FaProjectDiagram,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

function DashboardPage() {
  const { role } = useParams();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Dashboard for {role}</h1>
          <Row>
            {role !== "Employee" && (
              <>
                <Col md={6} className="mb-4">
                  <Card className="text-center">
                    <Card.Body>
                      <FaUsers size={50} className="mb-3" />
                      <Card.Title>Employees</Card.Title>
                      <Card.Text>Manage the list of employees</Card.Text>
                      <Button
                        as={Link}
                        to={`/employees/${role}`}
                        variant="primary"
                      >
                        Go to
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-4">
                  <Card className="text-center">
                    <Card.Body>
                      <FaProjectDiagram size={50} className="mb-3" />
                      <Card.Title>Projects</Card.Title>
                      <Card.Text>Manage projects</Card.Text>
                      <Button
                        as={Link}
                        to={`/projects/${role}`}
                        variant="primary"
                      >
                        Go to
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )}
            <Col md={6} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <FaClipboardList size={50} className="mb-3" />
                  <Card.Title>Leave Requests</Card.Title>
                  <Card.Text>Manage leave requests</Card.Text>
                  <Button
                    as={Link}
                    to={`/leave-requests/${role}`}
                    variant="primary"
                  >
                    Go to
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            {role !== "Employee" && (
              <>
                <Col md={6} className="mb-4">
                  <Card className="text-center">
                    <Card.Body>
                      <FaCheckCircle size={50} className="mb-3" />
                      <Card.Title>Approval Requests</Card.Title>
                      <Card.Text>Manage approval requests</Card.Text>
                      <Button
                        as={Link}
                        to={`/approval-requests/${role}`}
                        variant="primary"
                      >
                        Go to
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
