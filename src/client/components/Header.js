import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background-color: ${props => props.theme.main};
  a {
    color: ${props => props.theme.light};
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    padding: 8px 14px;
    border: 2px solid ${props => props.theme.light};
    border-radius: 4px;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-family: 'gochi hand', cursive;
  flex: 1 1;
  cursor: pointer;
`;

const Header = ({ resetQuiz }) => (
  <StyledHeader>
    <Title onClick={resetQuiz}>songs for my mood</Title>
    <a href="/auth/logout">Logout</a>
  </StyledHeader>
);

export default Header;
