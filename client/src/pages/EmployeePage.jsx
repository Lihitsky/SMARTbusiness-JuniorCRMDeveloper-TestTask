import EmployeeList from "../components/lists/EmployeeList";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const EmployeePage = () => {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/dashboard/${role}`);
  };

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={handleBack}>
        ← Back
      </Button>
      <h2>Employees</h2>
      <EmployeeList />
    </div>
  );
};

export default EmployeePage;
