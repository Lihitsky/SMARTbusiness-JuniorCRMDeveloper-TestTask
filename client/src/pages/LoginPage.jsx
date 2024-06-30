import { Col } from "react-bootstrap";
import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  //const { message } = useSelector((state) => state.auth);
  //const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      //dispatch(loginUser({ email: data.email, password: data.password }));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}

export default LoginPage;
