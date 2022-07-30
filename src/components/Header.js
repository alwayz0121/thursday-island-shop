import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { isAuth, isAuthenticated, signOut } = useContext(AuthContext);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          Thursday Island
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/lookbook");
            }}
          >
            Look Book
          </Nav.Link>
        </Nav>

        <Nav className="ms-auto">
          {isAuth ? (
            <>
              <Nav.Link onClick={signOut}>Logout</Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/user/cart");
                }}
              >
                Cart
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                Cart
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
