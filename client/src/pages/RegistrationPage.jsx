import { Button, Col, Row } from "react-bootstrap";
import RegistrationForm from "../components/forms/RegistrationForm";

function RegistrationPage() {
  //const [role, setRole] = useState("student");
  //const { message } = useSelector((state) => state.auth);
  //const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      //dispatch();
      //registerUser({ email: data.email, password: data.password, role })
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return <RegistrationForm onSubmit={onSubmit} />;
}

export default RegistrationPage;
