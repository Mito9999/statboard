import styled from "styled-components";

export const CardWrapper = styled.div`
    flex: 1 0 200px;
    min-width: 250px;
    height: 250px;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 25px;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0);
    backface-visibility: hidden;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.295);
    transition: all 120ms ease-in;
    transition-property: transform, box-shadow;

    &:hover {
        transform: scale(1.03);
        box-shadow: 5px 8px 15px 0px rgba(0, 0, 0, 0.295);
    }

    @media (max-width: 500px) {
        flex-basis: auto;
        width: 90%;
    }
`;

export const Title = styled.div`
    text-align: center;
    font-size: 1.25rem;
`;

export const Data = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;

    span {
        font-size: 2rem;
        margin-right: 5px;
    }

    .dollar {
        font-size: 1.5rem;
    }
`;

export const Icons = styled.div`
    margin: 0 auto;
    font-size: 1.75rem;

    & > * {
        margin: 0 10px;
        cursor: pointer;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359.99deg);
        }
    }

    .refreshing {
        animation: spinner 1s linear infinite;
    }
`;
