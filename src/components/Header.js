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
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          Thursday Island
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link
              onClick={() => {
                navigate("/lookbook");
              }}
            >
              Look Book
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/top");
              }}
            >
              Top
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/onepiece");
              }}
            >
              One Piece
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/bottom");
              }}
            >
              Bottom
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {isAuth ? (
              <>
                {/* signOut 함수는 AuthContext에서 불러옴 */}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
