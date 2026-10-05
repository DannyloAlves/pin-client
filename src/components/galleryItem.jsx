import { styled } from "@linaria/react";
import { Link } from "react-router";
import Image from "./image";

const Overlay = styled(Link)`
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
`;

const SaveButton = styled.button`
    display: none;
    background-color: #e50829;
    color: white;
    border-radius: 24px;
    padding: 12px 16px;
    font-weight: 500;
    cursor: pointer;
    width: max-content;
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
`;

const OverlayIcons = styled.div`
    display: none;
    position: absolute;
    bottom: 16px;
    right: 16px;
    align-items: center;
    gap: 8px;
`;

const OverlayIcon = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f1f1f1;
    };

    img { /* Estilos para a imagem dentro do botão */
        width: 20px;
        height: 20px;
        /* Sobrescreve o estilo da GalleryImage para o tamanho do ícone */
        border-radius: 0; 
        object-fit: initial;
    };
`;

const Container = styled.div`
    display: flex;
    position: relative;

    img{
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
    };

    &:hover{
        ${Overlay}, ${SaveButton}{
            display: block;
        };

        ${OverlayIcons}{
            display: flex;
        };
    };
`;

export default function GalleryItem({ item }) {
    const optimizedHeight = (372 * item.height) / item.width

    return (
        <Container style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}>
            {/* <img src={item.media} alt="" /> */}
            <Image src={item.media} alt="" w={372} h={optimizedHeight} />
            <Overlay to={`/pin/${item._id}`} />
            <SaveButton>Save</SaveButton>
            <OverlayIcons>
                <OverlayIcon>
                    <Image src="/general/share.svg" alt="" />
                </OverlayIcon>
                <OverlayIcon>
                    <Image src="/general/more.svg" alt="" />
                </OverlayIcon>
            </OverlayIcons>
        </Container>
    );
};