import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 4;
  background-color: #52c7f9;
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
          <a href="/auth/logout">Logout</a>
        </StyledHeader>
      );
  }
};

export default Header;
