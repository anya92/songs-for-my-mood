import React from 'react';
import PropTypes from 'prop-types';

import { QuestionContainer, Title, Answers, Emoji } from './styled/Questions';
import { Button } from './styled/Buttons';

const Question = ({
  type, value, question, answers, handleAnswerClick, handleButtonClick,
}) => (
  <div>
    <QuestionContainer>
      <Title>{question}<br /><strong>{value && value.title}</strong></Title>
      <Answers>
        {
          answers.map(answer => (
            <Emoji
              key={answer.id}
              onClick={() => handleAnswerClick(type, { title: answer.title, id: answer.id })}
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
  </div>
);

Question.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
  }).isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default Question;
