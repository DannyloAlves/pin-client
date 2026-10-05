import { styled } from "@linaria/react";
import Gallery from "../components/gallery";
import { useSearchParams } from "react-router";

const Container = styled.div``;

export default function SearchPage() {
    let [searchParams] = useSearchParams()

    const search = searchParams.get("search")
    const boardId = searchParams.get("boardId")

    return (
        <Container>
            <Gallery search={search} boardId={boardId} />
        </Container>
    );
};