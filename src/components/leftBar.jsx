import { styled } from '@linaria/react';
import Image from './image';
import { Link } from 'react-router';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 72px;
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 16px 0px;
    border-right: 1px solid #e9e9e9;
`;

const MenuIcons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
`;

const Icon = styled(Link)`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        background-color: #f1f1f1;
    };
`;

const Logo = styled.img`
    width: 24px;
    height: 24px;
`;

export default function LeftBar() {
    return (
        <Container>
            <MenuIcons>
                <Icon href='/'>
                    {/* <Logo src='/general/logo.png' alt='' /> */}
                    <Image src='/general/logo.png' alt='' w={24} h={24} />
                </Icon>
                <Icon href='/'>
                    <Image src='/general/home.svg' alt='' />
                </Icon>
                <Icon href='/create'>
                    <Image src='/general/create.svg' alt='' />
                </Icon>
                <Icon href='/'>
                    <Image src='/general/updates.svg' alt='' />
                </Icon>
                <Icon href='/'>
                    <Image src='/general/messages.svg' alt='' />
                </Icon>
            </MenuIcons>
            <Icon href='/'>
                <Image src='/general/settings.svg' alt='' />
            </Icon>
        </Container>
    );
};