import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
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
