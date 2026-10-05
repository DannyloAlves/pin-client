import { styled } from "@linaria/react";
import Image from "./image";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const BoardFormContainer = styled.div`
    background-color: white;
    padding: 32px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    position: relative;

    form{
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    };

    h1{
        font-size: 14px;
        font-weight: 500;
        color: #a6a6a6;
    };

    input{
        border: 2px solid #e9e9e9;
        border-radius: 16px;
        padding: 16px;
        font-size: 15px;
    };

    button{
        background-color: #e50829;
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        padding: 8px;
    };
`;

const BoardFormClose = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
`;

export default function BoardForm({ setIsNewBoardOpen, setNewBoard }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        setNewBoard(title);
        setIsNewBoardOpen(false);
    };

    return (
        <Container>
            <BoardFormContainer>
                <BoardFormClose onClick={() => setIsNewBoardOpen(false)}>
                    <Image src="/general/cancel.svg" alt="" w={20} h={20} />
                </BoardFormClose>
                <form onSubmit={handleSubmit}>
                    <h1>Create a new board</h1>
                    <input type="text" placeholder="Board Title" />
                    <button>Create</button>
                </form>
            </BoardFormContainer>
        </Container>
    );
};