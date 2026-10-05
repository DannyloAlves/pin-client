import { styled } from "@linaria/react";
import Image from "../components/image";
import { useState } from "react";
import Gallery from "../components/gallery";
import Boards from "../components/boards";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import FollowButton from "../components/followButton";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    img{
        border-radius: 50%;
        object-fit: cover;
    };

    h1{
        font-size: 36px;
        font-weight: 500;
    };

    span{
        font-weight: 300;
        color: gray;
    };
`;

const FollowCounts = styled.div`
    font-weight: 500;
`;

const ProfileInteractions = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

const ProfileButtons = styled.div`
    display: flex;
    gap: 16px;

    button{
        border: none;
        padding: 16px;
        border-radius: 32px;
        font-weight: bold;
        cursor: pointer;
    };
`;

const ProfileOptions = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 500;

    span{
        padding: 8px 0;
        cursor: pointer;

        &:hover{
            color: gray;
        };
    };

    span:first-child{
        border-bottom: ${(props) => props.$isActive === "created" ? "3px solid black" : ""};
    };
    span:last-child{
        border-bottom: ${(props) => props.$isActive === "saved" ? "3px solid black" : ""};
    };
`;

export default function ProfilePage() {
    const [type, setType] = useState("saved");

    const { username } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["profile", username],
        queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    if (!data) return "User not found!";

    return (
        <Container>
            <ProfileContainer>
                <Image src={data.img || "/general/noAvatar.png"} alt="" w={100} h={100} />
                <h1>{data.displayName}</h1>
                <span>@{data.username}</span>
            </ProfileContainer>
            <FollowCounts>{data.followerCount} followers · {data.followingCount} followings</FollowCounts>
            <ProfileInteractions>
                <Image src="/general/share.svg" alt="" />
                <ProfileButtons>
                    <button>Message</button>
                    <FollowButton isFollowing={data.isFollowing} username={data.username} />
                </ProfileButtons>
                <Image src="/general/more.svg" alt="" />
            </ProfileInteractions>
            <ProfileOptions $isActive={type}>
                <span onClick={() => setType("created")}>Created</span>
                <span onClick={() => setType("saved")}>Save</span>
            </ProfileOptions>
            {type === "created" ? (
                <Gallery userId={data._id} />
            ) : (
                <Boards userId={data._id} />
            )}
        </Container>
    );
};