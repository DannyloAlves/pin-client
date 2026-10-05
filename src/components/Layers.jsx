import { styled } from "@linaria/react";
import Image from "./image";
import useEditorStore from "../utils/editorStore";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
`;

const LayersTitle = styled.div`
    h3{
        font-size: 20px;
        font-weight: 500;
    };

    p{
        font-size: 14px;
        color: gray;
        margin-top: 4px;
    };
`;

const Layer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 300;
    font-size: 14px;
    background-color: ${(props) => props.$selectedLayer ? "#f0f0f0" : ""};

    &:hover{
        background-color: #f0f0f0;
    };
`;

const LayerImage = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 8px;
    overflow: hidden;
`;

export default function Layers() {
    const { selectedLayer, setSelectedLayer, addText, canvasOptions } =
        useEditorStore();

    const handleSelectedLayer = (layer) => {
        setSelectedLayer(layer);

        if (layer === "text") {
            addText();
        }
    };

    return (
        <Container>
            <LayersTitle>
                <h3>Layers</h3>
                <p>Select a layer to edit</p>
            </LayersTitle>
            <Layer onClick={() => handleSelectedLayer("text")} $selectedLayer={selectedLayer === "text"}>
                <LayerImage>
                    <Image src="/general/text.png" alt="" w={48} h={48} />
                </LayerImage>
                <span>Add Text</span>
            </Layer>
            <Layer onClick={() => handleSelectedLayer("canvas")} $selectedLayer={selectedLayer === "canvas"}>
                <LayerImage style={{ backgroundColor: canvasOptions.backgroundColor }}></LayerImage>
                <span>Canvas</span>
            </Layer>
        </Container>
    );
};