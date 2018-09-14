import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { QuestionContainer, Title, Answers, Emoji } from './styled/Questions';
import { Button } from './styled/Buttons';

const Radio = styled.div`
  padding: 5px;
  margin: 4px;
`;

const Input = styled.input`
  display: none;
  & + label span {
    display: inline-block;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 4px 8px 0 0;
    float: left;
    border: 2px solid #333;
    border-radius: 50%;
  }
  & + label {
    cursor: pointer;
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

const Question = ({
  type, value, question, answers, handleChange, handleButtonClick,
}) => (
  <QuestionContainer>
    <h4 style={{ textAlign: 'center' }}>{question}</h4>
    {
      answers.map(answer => (
        <Radio key={answer}>
          <Input
            type="radio"
            id={answer}
            name={question}
            value={answer}
            checked={value === answer}
            onChange={e => handleChange(e, type)}
          />
          <label htmlFor={answer}>
            {answer}
            <span />
          </label>
        </Radio>
      ))
    }
    <Button
      hide={value === ''}
      onClick={() => handleButtonClick()}
    >
      Next
    </Button>
  </QuestionContainer>
  /* <div>
    <QuestionContainer>
      <Title>{question}<br /><strong>{value && value.title}</strong></Title>
      <Answers>
        {
          answers.map(answer => (
            <Emoji
              key={answer.id}
              onClick={() => handleChange(type, { title: answer.title, id: answer.id })}
            >
              <img src={answer.icon} alt={answer.title} />
              <div>{answer.title}</div>
            </Emoji>
          ))
        }
      </Answers>
      <Button
        hide={value.title === ''}
        onClick={() => handleButtonClick()}
      >
        Next
      </Button>
    </QuestionContainer>
  </div> */
);

Question.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default Question;
