import { styled } from '@linaria/react';
import { useState } from 'react';
import Image from './image';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../utils/authStore';

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;

    @media (max-width: 475px) {
        display: none;
    };

    img{
        border: 100%;
        object-fit: cover;
    };

    img:last-child{
        cursor: pointer;
    };
`;

const Avatar = styled.img`
    width: 36px;
    height: 36px;
    border: 100%;
    object-fit: cover;
`;

const Arrow = styled.img`
    width: 16px;
    height: 16px;
    border: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const UserOptions = styled.div`
    position: absolute;
    right: 0;
    top: 120%;
    padding: 16px;
    border-radius: 8px;
    background-color: white;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.177);

    div, a{
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;

        &:hover{
            background-color: #f1f1f1;
            color: gray;
        };
    };
`;

const Button = styled(Link)`
    font-size: 18px;
    padding: 16px;
    border-radius: 32px;

    &:hover{
        background: #f1f1f1;
    };
`;

export default function UserButton() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { currentUser, removeCurrentUser } = useAuthStore();

    const handleLogout = async () => {
        try {
            await apiRequest.post("/users/auth/logout", {});
            removeCurrentUser();
            navigate("/auth");
        } catch (err) {
            console.log(err);
        }
    };

    return currentUser ? (
        <Container>
            {/* <Avatar src="/general/noAvatar.png" alt="" />
            <Arrow src="/general/arrow.svg" alt="" onClick={() => setOpen((prev) => !prev)} /> */}
            <Image src={currentUser.img || "/general/noAvatar.png"} alt="" w={36} h={36} />
            <div onClick={() => setOpen((prev) => !prev)}>
                <Image src="/general/arrow.svg" alt="" w={16} h={16} />
            </div>
            {open && (
                <UserOptions >
                    <Link to={`/profile/${currentUser.username}`}>
                        Profile
                    </Link>
                    <div>Settings</div>
                    <div onClick={handleLogout}>
                        Logout
                    </div>
                </UserOptions>
            )}
        </Container>
    ) : (
        <Button to="/auth">Login / Sign Up</Button>
    )
};