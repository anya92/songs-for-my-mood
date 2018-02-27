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
  background-color: #34ace0;
  a {
    color: #f7f1e3;
    font-size: 18px;
    font-weight: 500;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-family: 'gochi hand', cursive;
  flex: 1 1;
`;

const Header = ({ auth }) => {
  switch (auth) {
    case null:
      return <div />;
    case false:
      return <div />;
    default:
      return (
        <StyledHeader>
          <Title>songs for my mood</Title>
          <a href="/auth/logout">Logout</a>
        </StyledHeader>
      );
  }
};

export default Header;
