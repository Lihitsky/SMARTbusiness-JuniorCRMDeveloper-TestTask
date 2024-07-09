import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../utils/axios";

const AddProjectModal = ({ show, onClose, onRefreshList }) => {
  const [formState, setFormState] = useState({
    project_type_id: 1,
    start_date: "",
    end_date: "",
    project_manager_id: 1,
    status: false,
    comment: "",
  });
  const [projectTypes, setProjectTypes] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await axios.get("projectTypes");
        setProjectTypes(response.data);
      } catch (error) {
        console.error("Error fetching project types", error);
      }
    };

    const fetchEmployees = async (employee_id) => {
      try {
        const response = await axios.get(`employees/position/${employee_id}`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchProjectTypes();
    fetchEmployees(6);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (newProject) => {
    try {
      await axios.post(`project`, newProject);
      onRefreshList();
      onClose();
    } catch (error) {
      console.error("Error saving project", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Project Type</Form.Label>
            <Form.Control
              as="select"
              name="project_type_id"
              value={formState.project_type_id}
              onChange={handleChange}
            >
              {projectTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.project_type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formState.start_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formState.end_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Project Manager</Form.Label>
            <Form.Control
              as="select"
              name="project_manager_id"
              value={formState.project_manager_id}
              onChange={handleChange}
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProjectStatus">
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
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={formState.comment}
              onChange={handleChange}
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

export default AddProjectModal;
