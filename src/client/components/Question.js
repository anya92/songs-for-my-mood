import React from 'react';

import { QuestionContainer, Title, Answers, Emoji } from './styled/Questions';
import { Button } from './styled/Buttons';

const Question = ({
  type, value, question, answers, handleAnswerClick, handleButtonClick,
}) => (
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
      hide={value == null}
      onClick={() => handleButtonClick()}
    >
      Next
    </Button>
  </QuestionContainer>
);

export default Question;
