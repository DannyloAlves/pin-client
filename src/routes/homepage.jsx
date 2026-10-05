import { styled } from "@linaria/react";
import Gallery from "../components/gallery";

const Container = styled.div``;

export default function Homepage() {
    return (
        <Container>
            <Gallery />
        </Container>
    );
};