import "./styles/GlobalStyles";
import { styled } from "@linaria/react";
import LeftBar from './components/leftBar';
import TopBar from "./components/topBar";
import Gallery from "./components/gallery";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
`;

function App() {
  return (
    <Container>
      <LeftBar />
      <Content>
        <TopBar />
        <Gallery />
      </Content>
    </Container>
  );
};

export default App
