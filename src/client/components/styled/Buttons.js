import styled from 'styled-components';

export const LoginButton = styled.div`
  margin: 20px 0;
  height: 100px;
  display: inline-flex;
  align-items: center;
  a {
    font-size: 20px;
    font-weight: 700;
    background-color: khaki;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 6px #eadc5f;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #555;
    text-decoration: none;
    padding: 20px 80px;
    &:hover {
      top: 2px;
      box-shadow: 0px 4px #eadc5f;
    }
    &:active {
      top: 6px;
      box-shadow: none;
    }
  }
`;

export const Button = styled.button`
  ${props => (props.hide
    ? 'opacity: 0; z-index: -10;'
    : 'opacity: 1; z-index: 1;'
  )};
  transition: opacity .4s ease-in-out;
  font-size: 20px;
  font-weight: 700;
  background-color: khaki;
  border: none;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 6px #eadc5f;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #555;
  outline: none;
  padding: 20px 80px;
  margin: 20px 0;
  cursor: pointer;
  &:hover {
    top: 2px;
    box-shadow: 0px 4px #eadc5f;
  }
  &:active {
    top: 6px;
    box-shadow: none;
  }
`;
