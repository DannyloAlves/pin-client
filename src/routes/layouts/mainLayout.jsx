import { styled } from "@linaria/react";
import LeftBar from "../../components/leftBar";
import TopBar from "../../components/topBar";
import { Outlet } from "react-router";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export default function MainLayout() {
  return (
    <Container>
      <LeftBar />
      <Content>
        <TopBar />
        <Outlet />
      </Content>
    </Container>
  );
};