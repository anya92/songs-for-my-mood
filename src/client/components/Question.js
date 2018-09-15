import React from 'react';
import PropTypes from 'prop-types';

import { QuestionContainer, Title, Radio, Input } from './styled/Questions';
import { Button } from './styled/Buttons';

const Question = ({
  type, value, question, answers, handleChange, handleButtonClick,
}) => (
  <QuestionContainer>
    <Title>{question}</Title>
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
            <span />
            {answer}
          </label>
        </Radio>
      ))
    }
    <div style={{
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      }}
    >
      <Button
        hide={value === ''}
        onClick={() => handleButtonClick()}
      >
        Next
      </Button>
    </div>
  </QuestionContainer>
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
