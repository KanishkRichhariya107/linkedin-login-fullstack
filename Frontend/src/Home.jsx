import { useLocation } from "react-router-dom";
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
  padding: 30px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

export default function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const email = params.get("email");

  return (
    <Container>
      <Card>
        <Title>Welcome </Title>
        <Info><b>Name:</b> {name}</Info>
        <Info><b>Email:</b> {email}</Info>
      </Card>
    </Container>
  );
}
