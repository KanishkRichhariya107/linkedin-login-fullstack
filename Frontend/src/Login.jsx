import styled from "styled-components";

const Button = styled.button`
  padding: 12px 20px;
  background: #0a66c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Login() {
  const loginWithLinkedIn = () => {
window.location.href = "/api/auth/linkedin";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      <Button onClick={loginWithLinkedIn}>
        Login with LinkedIn
      </Button>
    </div>
  );
}
