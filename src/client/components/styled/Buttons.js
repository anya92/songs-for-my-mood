import styled from 'styled-components';

export const ButtonWithLink = styled.div`
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  a {
    font-size: 18px;
    font-weight: 500;
    font-family: ubuntu, sans-serif;
    background-color: #ffda79;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 6px #ccae62;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #555;
    text-decoration: none;
    padding: 20px;
    &:hover {
      top: 2px;
      box-shadow: 0px 4px #ccae62;
    }
    &:active {
      top: 6px;
      box-shadow: none;
    }
  }
`;

export const Button = styled.button`
  ${props => (props.hide
    ? 'opacity: 0; z-index: -10; visibility: hidden; '
    : 'opacity: 1; z-index: 1; visibility: visible; '
  )};
  transition: all .3s ease-in-out;
  font-size: 18px;
  font-weight: 500;
  min-width: 255px;
  background-color: #ffda79;
  border: none;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 6px #ccae62;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: ubuntu, sans-serif;
  color: #555;
  outline: none;
  padding: 20px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    top: 2px;
    box-shadow: 0px 4px #ccae62;
  }
  &:active {
    top: 6px;
    box-shadow: none;
  }
`;
