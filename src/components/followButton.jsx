import { styled } from "@linaria/react";
import apiRequest from "../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Container = styled.button`
    border: none;
    padding: 16px;
    border-radius: 32px;
    font-weight: bold;
    background-color: #e50829;
    color: white;
    cursor: pointer;

    &:hover{
        background-color: #c1011e;
    };

    &:disabled{
        cursor: not-allowed;
        opacity: 0.5;
    };
`;


const followUser = async (username) => {
    const res = await apiRequest.post(`/users/follow/${username}`);
    return res.data;
};

export default function FollowButton({ isFollowing, username }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: followUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", username] });
        },
    });

    return (
        <Container onClick={() => mutation.mutate(username)} disabled={mutation.isPending}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Container>
    );
};