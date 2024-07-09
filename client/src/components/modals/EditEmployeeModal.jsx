import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../utils/axios";
import PropTypes from "prop-types";

const EditEmployeeModal = ({ show, employee, onClose, onRefreshList }) => {
  const [formState, setFormState] = useState(employee);
  const [subdivisions, setSubdivisions] = useState([]);
  const [positions, setPositions] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchSubdivisions = async () => {
      try {
        const response = await axios.get("subdivisions");
        setSubdivisions(response.data);
      } catch (error) {
        console.error("Error fetching subdivisions", error);
      }
    };

    const fetchPositions = async () => {
      try {
        const response = await axios.get("positions");
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchSubdivisions();
    fetchPositions();
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFormState(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`employee/${formState.id}`, formState);
      onRefreshList();
      onClose();
    } catch (error) {
      console.error("Error saving employee", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formState.full_name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subdivision</Form.Label>
            <Form.Control
              as="select"
              name="subdivision_id"
              value={formState.subdivision_id || ""}
              onChange={handleChange}
            >
              {subdivisions.map((subdivision) => (
                <option key={subdivision.id} value={subdivision.id}>
                  {subdivision.subdivision_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              as="select"
              name="position_id"
              value={formState.position_id || ""}
              onChange={handleChange}
            >
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.position_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>People Partner</Form.Label>
            <Form.Control
              as="select"
              name="people_partner_id"
              value={formState.people_partner_id || ""}
              onChange={handleChange}
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Out of Office Balance</Form.Label>
            <Form.Control
              type="number"
              name="out_of_office_balance"
              value={formState.out_of_office_balance || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmployeeModal;
