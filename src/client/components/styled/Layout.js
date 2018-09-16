import styled from 'styled-components';

import media from './mediaQueries';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 100%;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.light};
  font-family: ubuntu, sans-serif;
`;

export const Loader = styled.div`
  font-size: 24px;
  height: 100%;
  color: ${props => props.theme.light};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 20px;
  color: #555;
  background-color: ${props => props.theme.light};
  font-size: 14px;
  div {
    margin: 10px 5px;
  }
  a {
    color: #555;
    font-weight: 600;
    margin-left: 6px;
  }
  ${media.medium`
    flex-direction: row;
    justify-content: space-evenly;
  `}
`;
