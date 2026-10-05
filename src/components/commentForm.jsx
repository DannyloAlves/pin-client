import { styled } from "@linaria/react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Container = styled.form`
    background-color: #f1f1f1;
    padding: 16px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    gap: 16px;

    input{
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 16px;
    };
`;

const Emoji = styled.div`
    cursor: pointer;
    font-size: 20px;
    position: relative;
`;

const EmojiContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 50px;
`;

const addComment = async (comment) => {
    const res = await apiRequest.post("/comments", comment);
    return res.data;
};

export default function CommentForm({ id }) {
    const [open, setOpen] = useState(false);
    const [desc, setDesc] = useState("");

    const handleEmojiClick = (emoji) => {
        setDesc((prev) => prev + " " + emoji.emoji);
        setOpen(false);
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            setDesc("");
            setOpen(false);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        mutation.mutate({
            description: desc,
            pin: id,
        });
    };

    return (
        <Container onSubmit={handleSubmit}>
            <input type="text" placeholder="Add a comment..." onChange={(e) => setDesc(e.target.value)} value={desc} />
            <Emoji>
                <div onClick={() => setOpen((prev) => !prev)}>😊</div>
                {open && (
                    <EmojiContainer>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </EmojiContainer>
                )}
            </Emoji>
        </Container>
    );
};