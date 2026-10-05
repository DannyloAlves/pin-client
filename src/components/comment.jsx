import { styled } from "@linaria/react";
import Image from "./image";
import { format } from "timeago.js";

const Container = styled.div`
    display: flex;
    gap: 16px;

    img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    };
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    p{
        font-size: 14px;
    };

    span:first-child{
        font-weight: 500;
        font-size: 14px;
    };
    span:last-child{
        font-size: 12px;
        color: #a6a6a6;
    };
`;

export default function Comment({ comment }) {
    return (
        <Container>
            <Image src={comment.user.img || "/general/noAvatar.png"} alt="" />
            <CommentContent>
                <span>{comment.user.displayName}</span>
                <p>{comment.description}</p>
                <span>{format(comment.createdAt)}</span>
            </CommentContent>
        </Container>
    );
};