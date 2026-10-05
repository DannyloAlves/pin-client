import { styled } from "@linaria/react";
import Layers from "./Layers";
import Workspace from "./Workspace";
import Options from "./Options";

const Container = styled.div`
    display: flex;
    gap: 16px;
`;

export default function Editor({ previewImg }) {
    return (
        <Container>
            <Layers previewImg={previewImg} />
            <Workspace previewImg={previewImg} />
            <Options previewImg={previewImg} />
        </Container>
    );
};