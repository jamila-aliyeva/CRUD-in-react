import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const adminEmail = "admin@example.com";
  const adminPassword = "qwerty";

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("qwerty");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem("is_authenticated", true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: "success",
            title: "Sucsessfully login!",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Erroe!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div style={{ background: "#AED2FF" }}>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <Form
          onSubmit={handleLogin}
          className="w-35 mt-4"
          style={{
            padding: "100px",
            borderRadius: "8px",
            background: "white",
          }}>
          <h1 className="mb-4"> Admin Login</h1>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label htmlFor="email">Email </Form.Label>
            <Form.Control
              id="email"
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder="qwerty"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{
              marginTop: "12px",
              background: "#AED2FF",
              border: "none",
              width: "100%",
            }}
            type="submit"
            value="Login">
            Login
          </Button>
        </Form>

        {/* <input style={{ marginTop: "12px" }} type="submit" value="Login" /> */}
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
