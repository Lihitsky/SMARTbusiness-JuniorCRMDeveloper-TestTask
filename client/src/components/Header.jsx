import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Header() {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          onClick={handleHomeRedirect}
          style={{ cursor: "pointer" }}
        >
          Out of Office Solution
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <a
            href="https://github.com/Lihitsky"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={28}
              style={{ color: "#5e5e5e", marginRight: "15px" }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D1%83%D1%80-%D0%BB%D1%96%D1%85%D1%96%D1%86%D1%8C%D0%BA%D0%B8%D0%B9-782a77291/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} style={{ color: "#5e5e5e" }} />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
