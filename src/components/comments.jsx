import { styled } from "@linaria/react";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import Comment from "./comment";
import CommentForm from "./commentForm";

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
`;

const CommentList = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
`;

export default function Comments({ id }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <Container>
            <CommentList>
                <span>{data.length === 0 ? "No comments" : data.length + " Comments"}</span>
                {data.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </CommentList>
            <CommentForm id={id} />
        </Container>
    );
};