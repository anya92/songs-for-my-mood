import styled from 'styled-components';

export const QuestionContainer = styled.div`
  font-family: ubuntu;
  text-align: center;
  visibility: hidden;
  animation: display .3s .5s ease-in-out forwards;
  @keyframes display {
    from { visibility: hidden; opacity: 0; }
    to { visibility: visible; opacity: 1; }
  }
`;

export const Title = styled.div`
  height: 150px;
  font-size: 2.2rem;
  font-weight: 300;
  line-height: 1.5;
  strong {
    font-size: 2.5rem
    font-weight: 700;
    color: khaki;
    text-transform: uppercase;
  }
`;

export const Answers = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
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
    font-size: 1.2rem;
    font-weight: 400;
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
