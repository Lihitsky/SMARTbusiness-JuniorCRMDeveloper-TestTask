import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header() {
  //   const logoutHandler = () => {
  //     dispatch(logout());
  //     window.localStorage.removeItem("token");
  //     roleRedirect("/");
  //   };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          //onClick={() => roleRedirect("/")}
          style={{ cursor: "pointer" }}
        >
          Out of Office solution
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>You are logged in as: Artur Lihitsky</Navbar.Text>
          <Button
            variant="link"
            //onClick={logoutHandler}
            style={{ textDecoration: "none" }}
          >
            Logout
          </Button>
          {/* {user && (
          )} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
