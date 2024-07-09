import LeaveRequestList from "../components/lists/LeaveRequestList";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const LeaveRequestPage = () => {
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
      <h2>Leave Requests</h2>
      <LeaveRequestList />
    </div>
  );
};

export default LeaveRequestPage;
