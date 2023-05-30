import styled from 'styled-components';

export const PerItem = styled.div`
    width: 400px;
    margin: 0 auto;
    padding: 10px;
    & img {
        width: 100%;
    }
    & h1, h4 {
        color: black;
    }

`;

export const AddForm = styled.div`
    display: grid;
    padding: 20px;
    width: 300px;
    margin: 0 auto;
    text-align: center;
    border: 3px solid grey;
    border-radius: 15px;
    & input {
        padding: 10px;
        margin: 10px 0px;
        border-radius: 15px;
        background: #EEE;
        border: 1px solid grey;
        color: #000;
    }
    & #icon-button-file {
        border: none;
        text-align: centre;
        margin: 10px 0px;
        background: none;

    }
    & button {
        padding: 10px;
        margin: 5px;
    }
`;

export const ItemsList = styled.div`
    display: inline-flex;
    width: 100wv;
    background: #FFF;
    margin-top: 30px;
    flex-wrap: wrap;
`;