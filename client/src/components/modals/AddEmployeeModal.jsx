import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../utils/axios";

const AddEmployeeModal = ({ show, onClose, onRefreshList }) => {
  const [formState, setFormState] = useState({
    full_name: "",
    subdivision_id: 1,
    position_id: 1,
    people_partner_id: 1,
    out_of_office_balance: 0,
    status: false,
    photo: null,
  });
  const [positions, setPositions] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("positions");
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions", error);
      }
    };

    const fetchSubdivisions = async () => {
      try {
        const response = await axios.get("subdivisions");
        setSubdivisions(response.data);
      } catch (error) {
        console.error("Error fetching subdivisions", error);
      }
    };

    const fetchPartners = async (partner_id) => {
      try {
        const response = await axios.get(`employees/position/${partner_id}`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners", error);
      }
    };

    fetchPartners(1);
    fetchPositions();
    fetchSubdivisions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (newEmployee) => {
    try {
      await axios.post(`employee`, newEmployee);
      onRefreshList();
      onClose();
    } catch (error) {
      console.error("Error saving employee", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formState.full_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subdivision</Form.Label>
            <Form.Control
              as="select"
              name="subdivision_id"
              value={formState.subdivision_id}
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
              value={formState.position_id}
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
            <Form.Label>Partner</Form.Label>
            <Form.Control
              as="select"
              name="people_partner_id"
              value={formState.people_partner_id}
              onChange={handleChange}
            >
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.full_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Out of Office Balance</Form.Label>
            <Form.Control
              type="text"
              name="out_of_office_balance"
              value={formState.out_of_office_balance}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmployeeStatus">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="checkbox"
              name="status"
              label="Active"
              checked={formState.status}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  status: e.target.checked,
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(formState)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;
