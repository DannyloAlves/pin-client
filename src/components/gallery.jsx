import { styled } from "@linaria/react";
import GalleryItem from "./galleryItem";
import apiRequest from "../utils/apiRequest";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from 'react-infinite-scroll-component';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 16px;
    grid-auto-rows: 10px;

    @media (max-width: 1746px) {
        grid-template-columns: repeat(6, 1fr);
    };
    @media (max-width: 1509px) {
        grid-template-columns: repeat(5, 1fr);
    };
    @media (max-width: 1272px) {
        grid-template-columns: repeat(4, 1fr);
    };
    @media (max-width: 1035px) {
        grid-template-columns: repeat(3, 1fr);
    };
    @media (max-width: 798px) {
        grid-template-columns: repeat(2, 1fr);
    };
    @media (max-width: 475px) {
        grid-template-columns: repeat(1, 1fr);
    };
`;

const fetchPins = async ({ pageParam, search, userId, boardId }) => {
    const res = await apiRequest.get(
        `/pins?cursor=${pageParam}&search=${search || ""
        }&userId=${userId || ""}&boardId=${boardId || ""}`
    );
    return res.data;
};


export default function Gallery({ search, userId, boardId }) {
    const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
        // queryKey: ["pins"],
        // FIXED QUERY KEY
        queryKey: ["pins", search, userId, boardId],
        queryFn: ({ pageParam = 0 }) =>
            fetchPins({ pageParam, search, userId, boardId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    });

    // FIXED: ADD SKELETON LOADING
    // if (status === "pending") return "Loading...";
    if (status === "pending") return <Skeleton />;
    if (status === "error") return "Something went wrong...";

    const allPins = data?.pages.flatMap((page) => page.pins) || [];

    return (
        <InfiniteScroll
            dataLength={allPins.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more pins</h4>}
            endMessage={<h3>All Posts Loaded!</h3>}
        >
            <Container>
                {allPins?.map((item) => (
                    <GalleryItem key={item._id} item={item} />
                ))}
            </Container>
        </InfiniteScroll>
    );
};