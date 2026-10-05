import { styled } from "@linaria/react";
import IKImage from "../components/image";
import useAuthStore from "../utils/authStore";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Editor from "../components/editor";
import useEditorStore from "../utils/editorStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import BoardForm from "../components/BoardForm";

const Container = styled.div``;

const CreateTop = styled.div`
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1{
        font-size: 20px;
        font-weight: 500;
    };

    button{
        background-color: #e50829;
        color: white;
        font-weight: 500;
        border: none;
        outline: none;
        padding: 16px;
        border-radius: 32px;
        font-size: 15px;
        cursor: pointer;

        &:hover{
            background-color: #c1011e;
        };
    };
`;

const CreateBottom = styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    gap: 64px;

    @media (max-width: 1104px) {
        flex-direction: column;
        align-items: center;
        margin-bottom: 64px;
    };
`;

const Preview = styled.div`
    width: 375px;
    position: relative;

    img{
        border-radius: 32px;
        width: 100%;
    };
`;

const EditIcon = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: white;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
`;

const Upload = styled.label`
    position: relative;
    background-color: #e9e9e9;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 32px;
    border: 2px dashed #dddddd;
    width: 375px;
    height: 574px;
    padding: 16px;

    @media (max-width: 475px) {
        width: 100%;
    };
`;

const UploadTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const UploadInfo = styled.div`
    position: absolute;
    bottom: 32px;
    font-size: 13px;
    text-align: center;
    color: gray;
`;

const CreateForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 584px;

    @media (max-width: 768px) {
        width: 100%;
    };
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    label{
        font-size: 13px;
        color: gray;
    };

    input, textarea, select{
        font-size: 15px;
        border: 2px solid #e9e9e9;
        padding: 16px;
        border-radius: 16px;
    };

    textarea{
        resize: none;
    };

    small{
        color: #a6a6a6;
        font-size: 13px;
    };
`;

const NewBoard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
`;

const NewBoardContainer = styled.div`
    flex: 1;
    display: flex;
`;

const NewBoardItem = styled.div`
    padding: 8px;
    border-radius: 12px;
    background-color: #e9e9e9;
    font-size: 13px;
    cursor: pointer;
`;

const CreateBoardButton = styled.div`
    background-color: #e50829;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 13px;
    width: max-content;
    align-self: flex-end;
`;

// FIXED: CHANGE DIRECT REQUEST TO MUTATION
const addPost = async (post) => {
    const res = await apiRequest.post("/pins", post);
    return res.data;
};

export default function CreatePage() {
    const { currentUser } = useAuthStore();
    const navigate = useNavigate();
    const formRef = useRef();
    const { textOptions, canvasOptions, resetStore } = useEditorStore();

    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState({
        url: "",
        width: 0,
        height: 0,
    });
    const [isEditing, setIsEditing] = useState(false);
    // FIXED: ADD NEW BOARD
    const [newBoard, setNewBoard] = useState("");
    const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/auth");
        }
    }, [navigate, currentUser]);

    useEffect(() => {
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setPreviewImg({
                    url: URL.createObjectURL(file),
                    width: img.width,
                    height: img.height,
                });
            };
        }
    }, [file]);

    // FIXED: CHANGE DIRECT REQUEST TO MUTATION
    const mutation = useMutation({
        mutationFn: addPost,
        onSuccess: (data) => {
            resetStore();
            navigate(`/pin/${data._id}`);
        },
    });

    const handleSubmit = async () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            const formData = new FormData(formRef.current);
            formData.append("media", file);
            formData.append("textOptions", JSON.stringify(textOptions));
            formData.append("canvasOptions", JSON.stringify(canvasOptions));
            // FIXED: ADD NEW BOARD
            formData.append("newBoard", newBoard);

            // FIXED: CHANGE DIRECT REQUEST TO MUTATION
            // try {
            //   const res = await apiRequest.post("/pins", formData, {
            //     headers: {
            //       "Content-Type": "multipart/form-data",
            //     },
            //   });
            //   navigate(`/pin/${res.data._id}`)
            // } catch (err) {
            //   console.log(err);
            // }
            mutation.mutate(formData);
        }
    };

    // FIXED: FETCH EXISTING BOARDS
    const { data, isPending, error } = useQuery({
        queryKey: ["formBoards"],
        queryFn: () => apiRequest.get(`/boards`).then((res) => res.data),
    });

    // FIXED: ADD NEW BOARD
    const handleNewBoard = () => {
        setIsNewBoardOpen((prev) => !prev);
    };

    return (
        <Container>
            <CreateTop>
                <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
                <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
            </CreateTop>
            {isEditing ? (
                <Editor previewImg={previewImg} />
            ) : (
                <CreateBottom>
                    {previewImg.url ? (
                        <Preview>
                            <img src={previewImg.url} alt="" />
                            <EditIcon onClick={() => setIsEditing(true)}>
                                <IKImage src="/general/edit.svg" alt="" />
                            </EditIcon>
                        </Preview>
                    ) : (
                        <>
                            <Upload htmlFor="file">
                                <UploadTitle>
                                    <IKImage src="/general/upload.svg" alt="" />
                                    <span>Choose a file</span>
                                </UploadTitle>
                                <UploadInfo>
                                    We recommend using high quality .jpg files less than 20 MB or
                                    .mp4 files less than 200 MB.
                                </UploadInfo>
                            </Upload>
                            <input type="file" id="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </>
                    )}
                    <CreateForm ref={formRef}>
                        <FormItem>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                placeholder="Add a title"
                                name="title"
                                id="title"
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="description">Description</label>
                            <textarea
                                rows={6}
                                type="text"
                                placeholder="Add a detailed description"
                                name="description"
                                id="description"
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                placeholder="Add a link"
                                name="link"
                                id="link"
                            />
                        </FormItem>
                        {(!isPending || !error) && (
                            <FormItem>
                                <label htmlFor="board">Board</label>
                                <select name="board" id="board">
                                    <option value="">Choose a board</option>
                                    {data?.map((board) => (
                                        <option value={board._id} key={board._id}>
                                            {board.title}
                                        </option>
                                    ))}
                                </select>
                                <NewBoard>
                                    {newBoard && (
                                        <NewBoardContainer>
                                            <NewBoardItem>{newBoard}</NewBoardItem>
                                        </NewBoardContainer>
                                    )}
                                    <CreateBoardButton onClick={handleNewBoard}>
                                        Create new board
                                    </CreateBoardButton>
                                </NewBoard>
                            </FormItem>
                        )}
                        <FormItem>
                            <label htmlFor="tags">Tagged topics</label>
                            <input type="text" placeholder="Add tags" name="tags" id="tags" />
                            <small>Don&apos;t worry, people won&apos;t see your tags</small>
                        </FormItem>
                    </CreateForm>
                    {isNewBoardOpen && (
                        <BoardForm
                            setIsNewBoardOpen={setIsNewBoardOpen}
                            setNewBoard={setNewBoard}
                        />
                    )}
                </CreateBottom>
            )}
        </Container>
    );
};