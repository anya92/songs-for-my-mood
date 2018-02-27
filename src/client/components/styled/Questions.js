import styled from 'styled-components';
import media from './mediaQueries';

export const QuestionContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
  @keyframes display {
    from { visibility: hidden; opacity: 0; }
    to { visibility: visible; opacity: 1; }
  }
`;

export const Title = styled.div`
  height: 120px;
  font-size: 28px;
  font-weight: 300;
  line-height: 1.5;
  visibility: hidden;
  opacity: 0;
  animation: display .3s .5s ease-in-out forwards;  
  strong {
    font-size: 28px;
    font-weight: 600;
    color: khaki;
    text-transform: uppercase;
  }
  ${media.small`
    font-size: 30px;
    strong {
      font-size: 34px;
    }
  `}
  ${media.medium`
    font-size: 34px;
    strong {
      font-size: 38px;
    }
  `}
`;

export const Answers = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  visibility: hidden;
  opacity: 0;
  animation: display .3s .5s ease-in-out forwards;
`;

export const Emoji = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 80px;
  img {
    cursor: pointer;
    width: 80px;
    height: 80px;
    transition: transform .3s ease-in-out;
  }
  div {
    display: none;
  }
  ${media.small`
  flex-basis: 100px;
    img {
      width: 100px;
      height: 100px;
    }
    div {
      display: block;
      opacity: 0;
      visibility: hidden;
      margin-top: 20px;
      font-size: 16px;
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
  `}
  ${media.medium`
    flex-basis: 120px;
    img {
      width: 120px;
      height: 120px;
    }
    div {
      font-size: 20px;
    }
  `}
`;
