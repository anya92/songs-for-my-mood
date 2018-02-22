import styled from 'styled-components';

export const QuestionContainer = styled.div`
  font-family: ubuntu;
  text-align: center;
  visibility: hidden;
  animation: display .3s .5s ease-in-out forwards;
  p {
    font-size: 2.2rem;
    font-weight: 300;
    strong {
      font-size: 2.5rem;
      font-weight: 700;
      color: khaki;
      text-transform: uppercase;
    }
  }
  @keyframes display {
    from { visibility: hidden; opacity: 0; }
    to { visibility: visible; opacity: 1; }
  }
`;

export const Answers = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Emoji = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 120px;
  img {
    cursor: pointer;
    width: 120px;
    height: 120px;
    transition: transform .3s ease-in-out;
  }
  div {
    margin-top: 10px;
    opacity: 0;
    visibility: hidden;
    display: none;
    font-size: 1.8rem;
    font-weight: 300;
    text-transform: uppercase;
    transition: all .3s ease-in-out;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
    div {
      visibility: visible;
      opacity: 1;
    }
  }
`;
