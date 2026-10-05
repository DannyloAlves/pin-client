import { styled } from "@linaria/react";
import { HexColorPicker } from "react-colorful";
import useEditorStore from "../utils/editorStore";
import { useState } from "react";

const Container = styled.div`
    flex: 1;
    margin-top: 32px;
`;

const EditingOption = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;

    span{
        font-weight: 500;
    };

    input{
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
    };
`;

const TextColor = styled.div`
    position: relative;
`;

const ColorPreview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
`;

const ColorPicker = styled.div`
    position: absolute;
    top: 120%;
    left: 0;
`;

const Orientations = styled.div`
    padding: 4px;
    border-radius: 8px;
    background-color: #e9e9e9;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    width: max-content;
`;

const Orientation = styled.div`
    padding: 8px;
    border-radius: 8px;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.$selectedOrientation ? "white" : ""};
    cursor: pointer;
`;

const Sizes = styled.div`
    padding: 4px;
    border-radius: 8px;
    background-color: #e9e9e9;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    width: max-content;
`;

const Size = styled.div`
    padding: 8px;
    border-radius: 8px;
    min-width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.$selectedSize ? "white" : ""};
    cursor: pointer;
`;

const BgColor = styled.div`
    position: relative;
`;

const portraitSizes = [
    {
        name: "1:2",
        width: 1,
        height: 2,
    },
    {
        name: "9:16",
        width: 9,
        height: 16,
    },
    {
        name: "2:3",
        width: 2,
        height: 3,
    },
    {
        name: "3:4",
        width: 3,
        height: 4,
    },
    {
        name: "4:5",
        width: 4,
        height: 5,
    },
    {
        name: "1:1",
        width: 1,
        height: 1,
    },
];

const landscapeSizes = [
    {
        name: "2:1",
        width: 2,
        height: 1,
    },
    {
        name: "16:9",
        width: 16,
        height: 9,
    },
    {
        name: "3:2",
        width: 3,
        height: 2,
    },
    {
        name: "4:3",
        width: 4,
        height: 3,
    },
    {
        name: "5:4",
        width: 5,
        height: 4,
    },
    {
        name: "1:1",
        width: 1,
        height: 1,
    },
];

export default function Options({ previewImg }) {
    const {
        selectedLayer,
        textOptions,
        setTextOptions,
        canvasOptions,
        setCanvasOptions,
    } = useEditorStore();
    const [isColorPickerOpen, setSetIsColorPickerOpen] = useState(false);

    const originalOrientation =
        previewImg.width < previewImg.height ? "portrait" : "landscape";

    const handleOrientationClick = (orientation) => {
        let newHeight;

        if (
            // FIXED: SHORTEN
            // (originalOrientation === "portrait" && orientation === "portrait") ||
            // (originalOrientation === "landscape" && orientation === "landscape")
            originalOrientation === orientation
        ) {
            newHeight = (375 * previewImg.height) / previewImg.width;
        } else {
            newHeight = (375 * previewImg.width) / previewImg.height;
        }

        setCanvasOptions({
            ...canvasOptions,
            orientation,
            size: "original",
            height: newHeight,
        });
    };

    const handleSizeClick = (size) => {
        let newHeight;

        if (size === "original") {
            if (
                // FIXED: SHORTEN
                // (originalOrientation === "portrait" &&
                //   canvasOptions.orientation === "portrait") ||
                // (originalOrientation === "landscape" &&
                //   canvasOptions.orientation === "landscape")
                originalOrientation === canvasOptions.orientation
            ) {
                newHeight = (375 * previewImg.height) / previewImg.width;
            } else {
                newHeight = (375 * previewImg.width) / previewImg.height;
            }
        } else {
            newHeight = (375 * size.height) / size.width;
        }

        setCanvasOptions({
            ...canvasOptions,
            size: size === "original" ? "original" : size.name,
            height: newHeight,
        });
    };

    return (
        <Container>
            {selectedLayer === "text" ? (
                <div>
                    <EditingOption>
                        <span>Font Size</span>
                        <input
                            type="number"
                            value={textOptions.fontSize}
                            onChange={(e) =>
                                setTextOptions({ ...textOptions, fontSize: e.target.value })
                            }
                        />
                    </EditingOption>
                    <EditingOption>
                        <span>Color</span>
                        <TextColor>
                            <ColorPreview
                                style={{ backgroundColor: textOptions.color }}
                                onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
                            />
                        </TextColor>
                        {isColorPickerOpen && (
                            <ColorPicker>
                                <HexColorPicker
                                    color={textOptions.color}
                                    onChange={(color) =>
                                        setTextOptions({ ...textOptions, color })
                                    }
                                />
                            </ColorPicker>
                        )}
                    </EditingOption>
                </div>
            ) : (
                <div>
                    <EditingOption>
                        <span>Orientation</span>
                        <Orientations>
                            <Orientation
                                $selectedOrientation={canvasOptions.orientation === "portrait"}
                                onClick={() => handleOrientationClick("portrait")}
                            >
                                P
                            </Orientation>
                            <Orientation
                                $selectedOrientation={canvasOptions.orientation === "landscape"}
                                onClick={() => handleOrientationClick("landscape")}
                            >
                                L
                            </Orientation>
                        </Orientations>
                    </EditingOption>
                    <EditingOption>
                        <span>Sizes</span>
                        <Sizes>
                            <Size
                                $selectedSize={canvasOptions.size === "original"}
                                onClick={() => handleSizeClick("original")}
                            >
                                Original
                            </Size>
                            {canvasOptions.orientation === "portrait" ? (
                                <>
                                    {portraitSizes.map((size) => (
                                        <Size
                                            $selectedSize={canvasOptions.size === size.name}
                                            key={size.name}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size.name}
                                        </Size>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {landscapeSizes.map((size) => (
                                        <Size
                                            $selectedSize={canvasOptions.size === size.name}
                                            key={size.name}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size.name}
                                        </Size>
                                    ))}
                                </>
                            )}
                        </Sizes>
                    </EditingOption>
                    <EditingOption>
                        <span>Background Color</span>
                        <BgColor>
                            <TextColor>
                                <ColorPreview
                                    style={{ backgroundColor: canvasOptions.backgroundColor }}
                                    onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
                                />
                            </TextColor>
                            {isColorPickerOpen && (
                                <ColorPicker>
                                    <HexColorPicker
                                        color={canvasOptions.backgroundColor}
                                        onChange={(color) =>
                                            setCanvasOptions({
                                                ...canvasOptions,
                                                backgroundColor: color,
                                            })
                                        }
                                    />
                                </ColorPicker>
                            )}
                        </BgColor>
                    </EditingOption>
                </div>
            )}
        </Container>
    );
};