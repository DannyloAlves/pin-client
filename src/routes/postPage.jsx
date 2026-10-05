import { styled } from "@linaria/react";
import Image from "../components/image";
import PostInteractions from "../components/postInteractions";
import { Link, useParams } from "react-router";
import Comments from "../components/comments";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";


const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 32px;
`;

const PostContainer = styled.div`
    width: 70%;
    max-height: 820px;
    display: flex;
    border: 1px solid #e9e9e9;
    border-radius: 32px;
    overflow: hidden;

    @media (max-width: 1127px) {
        width: 100%;
        margin-right: 16px;
    };
    @media (max-width: 751px) {
        flex-direction: column;
        max-height: unset;
    };
`;

const PostImg = styled.div`
    flex: 1;
    background-color: #c0a68c;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    };
`;

const PostDetails = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
    overflow: hidden;
`;

const PostUser = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;

    img{
        width: 32px;
        height: 32px;
        border-radius: 100%;
    };

    span{
        font-size: 14px;
    }
`;

export default function PostPage() {
    const { id } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["pin", id],
        queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    if (!data) return "Pin not found!";

    return (
        <Container>
            <svg
                height="20"
                viewBox="0 0 24 24"
                width="20"
                style={{ cursor: "pointer" }}
            >
                <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
            </svg>
            <PostContainer>
                <PostImg>
                    <Image src={data.media} alt="" w={376} />
                </PostImg>
                <PostDetails>
                    <PostInteractions postId={id} />
                    <PostUser to={`/${data.user.username}`}>
                        <Image src={data.user.img || "/general/noAvatar.png"} />
                        <span>{data.user.displayName}</span>
                    </PostUser>
                    <Comments id={data._id} />
                </PostDetails>
            </PostContainer>
        </Container>
    );
};