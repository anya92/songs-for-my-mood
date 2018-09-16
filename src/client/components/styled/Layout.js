import styled from 'styled-components';

export default styled.div`
  min-height: 100vh;
  max-width: 100%;
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.light};
  font-family: ubuntu, sans-serif;
`;
