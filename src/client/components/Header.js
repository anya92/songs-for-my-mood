import React from 'react';
import styled from 'styled-components';

import media from './styled/mediaQueries';

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  padding: 20px;
  background-color: ${props => props.theme.main};
  display: grid;
  justify-items: center;
  align-items: center;
  ${media.small`
    justify-items: normal;
  `}
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
  </StyledHeader>
);

export default Header;
