import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";

function AppLayout({ children }) {
  const { isLoading } = false;
  //const user = useSelector(getUser);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-5" style={{ minHeight: "83vh" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default AppLayout;
