import React from "react";
import styled from "styled-components";
import LogoImageSrc from '../assets/logo.png'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2962FF;
    color: white;
    flex-direction: column;
    text-align: center;
    font-family: Arial, sans-serif;
`;

const Subtitle = styled.p`
    font-size: 30px;
    font-weight: 100;
    font-family: "Black Han Sans", sans-serif;
    color: #FEF842;
    margin-bottom: 10px;
`;

const Divider = styled.div`
    width: 150px;
    height: 1px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const LogoImage = styled.img`
    width: 180px;
    height: auto;
`;

const CatText = styled.span`
    position: relative;
    display: inline-block;
`;

const PawIcon = styled.span`
    position: absolute;
    top: -5px;
    right: -15px;
    font-size: 20px;
`;

const SplashScreen = () => {
    return (
        <Container>
            <Subtitle>보이스피싱을 잡다.</Subtitle>
            <Divider />
            <LogoImage src={LogoImageSrc} alt="Logo" />
        </Container>
    );
};

export default SplashScreen;
