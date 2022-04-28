import styled from "@emotion/styled";

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-bottom: 1px solid lightgray;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    img {
        max-width: 125px;
        object-fit: contain;
        margin-left: 20px;
    }
`;

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
`;
