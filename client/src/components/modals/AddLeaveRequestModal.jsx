import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../utils/axios";

const AddLeaveRequestModal = ({ show, onClose, onRefreshList }) => {
  const [formState, setFormState] = useState({
    employee_id: 1,
    absence_reason_id: 1,
    start_date: "",
    end_date: "",
    status_id: 1,
    comment: "",
  });
  const [employees, setEmployees] = useState([]);
  const [absenceReasons, setAbsenceReasons] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    const fetchAbsenceReasons = async () => {
      try {
        const response = await axios.get("absenceReasons");
        setAbsenceReasons(response.data);
      } catch (error) {
        console.error("Error fetching absence reasons", error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const response = await axios.get("approvalStatuses");
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses", error);
      }
    };

    fetchEmployees();
    fetchAbsenceReasons();
    fetchStatuses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (newLeaveRequest) => {
    try {
      await axios.post(`leaveRequest`, newLeaveRequest);
      onRefreshList();
      onClose();
    } catch (error) {
      console.error("Error saving leave request", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Leave Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Employee</Form.Label>
            <Form.Control
              as="select"
              name="employee_id"
              value={formState.employee_id}
              onChange={handleChange}
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Absence Reason</Form.Label>
            <Form.Control
              as="select"
              name="absence_reason_id"
              value={formState.absence_reason_id}
              onChange={handleChange}
            >
              {absenceReasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {reason.reason}
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

export default AddLeaveRequestModal;
