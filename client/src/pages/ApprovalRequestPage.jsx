import ApprovalRequestList from "../components/lists/ApprovalRequestList";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const ApprovalRequestPage = () => {
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
      <h2>Approval Requests</h2>
      <ApprovalRequestList />
    </div>
  );
};

export default ApprovalRequestPage;
