import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: ${props => props.theme.colours.footer};
    color: ${props => props.theme.colours.footerItem};
    font-size: 14px;
    text-align: right;
    padding-right: 20px;
`;

const Footer = () => (
    <FooterContainer>&copy; Peter Knight - 2020</FooterContainer>
);

export default Footer;