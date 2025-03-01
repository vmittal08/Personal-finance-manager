import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${process.env.PUBLIC_URL}/images/bg1.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "white",
          padding: "2.5rem",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Personal Finance Manager
        </h1>
        <h3 style={{ marginBottom: "15px" }}>Welcome Back!</h3>

        <Button
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            width: "100%",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Log in with Google
        </Button>
        <p style={{ margin: "15px 0", fontWeight: "bold" }}>- OR -</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-key-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </InputGroup>
          </Form.Group>
          <Button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#64b5f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p style={{ marginTop: "15px" }}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
