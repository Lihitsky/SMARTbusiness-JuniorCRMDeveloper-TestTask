import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProjectList from "../components/lists/ProjectList";

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
      <h2>Projects</h2>
      <ProjectList />
    </div>
  );
};

export default EmployeePage;
