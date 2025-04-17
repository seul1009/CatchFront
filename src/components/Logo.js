import React from 'react';
import styled from 'styled-components/native';

const Title = styled.Text`
    color: ${props => props.color || '#355DFF'};
    font-size: 60px;
    font-weight: 700;
    font-family: "Ubuntu-Bold";
`;

export default function Logo({ color }) {
    return (
        <Title color={color}>
            Catch
        </Title>
    );
}
