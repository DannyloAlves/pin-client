import { styled } from "@linaria/react";
import Image from "./image";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import { Link } from "react-router";
import { format } from "timeago.js";

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    gap: 16px;
    row-gap: 80px;
    margin-bottom: 3rem;
`;

const Collection = styled(Link)`
    margin-bottom: 32px;
    cursor: pointer;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
    };
`;

const CollectionInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    h1{
        font-weight: 500;
        font-size: 16px;
    };

    span{
        color: gray;
        font-size: 13px;
    };
`;

export default function Boards({ userId }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["boards", userId],
        queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <Container>
            <Collection to={`/search?boardId=${board._id}`} key={board._id}>
                <Image src={board.firstPin.media} alt="" />
                <CollectionInfo>
                    <h1>{board.title}</h1>
                    <span>
                        {board.pinCount} Pins · {format(board.createdAt)}
                    </span>
                </CollectionInfo>
            </Collection>
        </Container>
    );
};