import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  border: 3px solid #0a66c2;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #666;
  text-align: left;
`;

const LogoutButton = styled.button`
  margin-top: 25px;
  padding: 12px 30px;
  background: #0a66c2;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #004182;
  }
`;

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const email = params.get("email");
  const picture = params.get("picture");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container>
      <Card>
        {picture && <ProfilePicture src={picture} alt="Profile" />}
        <Title>Welcome, {name}!</Title>
        <Info><b>Name:</b> {name}</Info>
        <Info><b>Email:</b> {email}</Info>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Card>
    </Container>
  );
}
