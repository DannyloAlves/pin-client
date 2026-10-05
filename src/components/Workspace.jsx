import { styled } from "@linaria/react";
import useEditorStore from "../utils/editorStore";
import { useEffect, useRef } from "react";
import Image from "./image";

const Container = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e9e9e9;
    padding: 64px 0px;
`;

const Canvas = styled.div`
    width: 375px;
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img{
        width: 100%;
    };
`;

const Text = styled.div`
    position: absolute;
    z-index: 999;
    max-width: 100%;
    border: 1px dashed red;

    input{
        border: none;
        outline: none;
        background-color: transparent;
        font-size: inherit;
        cursor: grab;
        width: 100%;
    };
`;

const DeleteTextButton = styled.div`
    position: absolute;
    top: -36px;
    right: 0;
    background-color: white;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
`;

export default function Workspace({ previewImg }) {
    const {
        setSelectedLayer,
        textOptions,
        setTextOptions,
        canvasOptions,
        setCanvasOptions,
    } = useEditorStore();

    useEffect(() => {
        if (canvasOptions.height === 0) {
            const canvasHeight = (375 * previewImg.height) / previewImg.width;

            setCanvasOptions({
                ...canvasOptions,
                height: canvasHeight,
                orientation: canvasHeight > 375 ? "portrait" : "landscape",
            });
        }
    }, [previewImg, canvasOptions, setCanvasOptions]);

    const itemRef = useRef(null);
    const containerRef = useRef(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!dragging.current) return;
        setTextOptions({
            ...textOptions,
            left: e.clientX - offset.current.x,
            top: e.clientY - offset.current.y,
        });
    };

    const handleMouseUp = () => {
        dragging.current = false;
    };

    const handleMouseLeave = () => {
        dragging.current = false;
    };

    const handleMouseDown = (e) => {
        setSelectedLayer("text");
        dragging.current = true;
        offset.current = {
            x: e.clientX - textOptions.left,
            y: e.clientY - textOptions.top,
        };
    };

    return (
        <Container>
            <Canvas
                style={{
                    height: canvasOptions.height,
                    backgroundColor: canvasOptions.backgroundColor,
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                ref={containerRef}
            >
                <img src={previewImg.url} alt="" />
                {textOptions.text && (
                    <Text
                        style={{
                            left: textOptions.left,
                            top: textOptions.top,
                            fontSize: `${textOptions.fontSize}px`,
                        }}
                        ref={itemRef}
                        onMouseDown={handleMouseDown}
                    >
                        <input
                            type="text"
                            value={textOptions.text}
                            onChange={(e) =>
                                setTextOptions({ ...textOptions, text: e.target.value })
                            }
                            style={{
                                color: textOptions.color,
                            }}
                        />
                        <DeleteTextButton onClick={() => setTextOptions({ ...textOptions, text: "" })}>
                            <Image src="/general/delete.svg" alt="" />
                        </DeleteTextButton>
                    </Text>
                )}
            </Canvas>
        </Container>
    );
};