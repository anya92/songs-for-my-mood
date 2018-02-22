import React from 'react';

import { QuestionContainer, Answers, Emoji } from './styled/Questions';
import { Button } from './styled/Buttons';

const Question = ({ type, value, question, answers, handleAnswerClick, handleButtonClick }) => (
  <QuestionContainer>
    <p>{question} <strong>{value}</strong></p>
    <Answers>
      {
        answers.map(answer => (
          <Emoji key={answer.id} onClick={() => handleAnswerClick(type, answer.title)}>
            <img src={answer.icon} alt={answer.title} />
            <div>{answer.title}</div>
          </Emoji>
        ))
      }
    </Answers>
    <Button
      hide={value == null}
      onClick={() => handleButtonClick()}
    >
      Next
    </Button>
  </QuestionContainer>
);

export default Question;
