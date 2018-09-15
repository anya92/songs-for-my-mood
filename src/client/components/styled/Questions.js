import styled from 'styled-components';
import media from './mediaQueries';

export const QuestionContainer = styled.div`
  height: 400px;
  font-size: 18px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  color: #333;
  position: relative;
`;

export const Title = styled.div`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
  ${media.small`
    font-size: 30px;
  `}
  ${media.medium`
    font-size: 34px;
  `}
`;

export const Radio = styled.div`
  padding: 5px;
  margin: 4px;
`;

export const Input = styled.input`
  display: none;
  & + label span {
    display: inline-block;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 3px 8px 0 0;
    float: left;
    border: 2px solid #333;
    border-radius: 50%;
  }
  & + label {
    cursor: pointer;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
  }
  &:checked + label {
    color: #34ace0;
  }
  &:checked + label span {
    position: relative;
    border-color: #34ace0;
    &::after {
      content: ' ';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #34ace0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
