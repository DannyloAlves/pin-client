import { styled } from '@linaria/react';
import UserButton from './userButton';
import Image from './image';
import { useNavigate } from 'react-router';

const Container = styled.div`
    margin: 16px 0;
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Search = styled.form`
    flex: 1;
    background-color: #f1f1f1;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;

    input{
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 18px;
    };
`;

export default function TopBar() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/search?search=${e.target[0].value}`);
    };

    return (
        <Container>
            {/* SEARCH */}
            <Search onSubmit={handleSubmit}>
                {/* <img src="/general/search.svg" /> */}
                <Image src="/general/search.svg" alt="" />
                <input type="text" placeholder='Search' />
            </Search>
            {/* USER */}
            <UserButton />
        </Container>
    );
};