import React from 'react'
import {Link, graphql,useStaticQuery} from 'gatsby'
import styled from '@emotion/styled'


const ImageBackground = styled('div')`
    background-image: url('boxing.jpg');
    background-position: top 20% center;
    background-size: cover;
    margin-bottom: 2rem;
    height: 15vw;
    border-radius: 5px;
    width: 100%;

    + * {
        margin-top: 0;
    }
`;

const TextBox = styled('div')`
    background-image: linear-gradient(to top, #000000dd 2rem, #dddddd00);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 0 calc((100vw - 550px) / 2) 2rem;
    with: 100%;

    p,
    a {
        color: #222;
        margin-top: 0;
    }
`;
const HeaderText = styled('h1')`
    font-size: 3rem;
    text-align: center;
    color: #333;
    text-shadow: 1px 1px 3px #ddd;
    margin: auto;
`;
const SubHeaderText = styled('p')`
    font-size: 1.2rem;
    margin: auto;
`;
const Hero = () => {
    return (
        <>  <div style={{padding: '1rem',margin: 'auto',display: 'flex',flexDirection: 'column'}}>
            <HeaderText>Boxing.Report</HeaderText>
            {/* <SubHeaderText>Get Some</SubHeaderText> */}
        </div>
            <ImageBackground>
                <TextBox/>
            </ImageBackground>
        </>
    )
}

export default Hero