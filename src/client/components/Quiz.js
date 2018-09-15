import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Question from './Question';

class Quiz extends Component {
  state = {
    questionNumber: 1,
  }

  handleButtonClick = () => {
    if (this.state.questionNumber <= 2) {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1,
      }));
    } else {
      this.props.submitAnswers();
    }
  }

  renderQuestions() {
    const { questionNumber } = this.state;
    const { mood, danceability, energy } = this.props;
    let answers;
    switch (questionNumber) {
      case 1:
        answers = [
          'sad',
          'angry',
          'fine',
          'cheerful',
          'happy',
        ];
        return (
          <Question
            type="mood"
            value={mood}
            question="Today I am"
            answers={answers}
            handleChange={this.props.handleChange}
            handleButtonClick={this.handleButtonClick}
          />
        );
      case 2:
        answers = [
          'lay in my bed',
          'listen to music with my headphones',
          'dance all day... and night!',
        ];
        return (
          <Question
            type="danceability"
            value={danceability}
            question="I want to"
            answers={answers}
            handleChange={this.props.handleChange}
            handleButtonClick={this.handleButtonClick}
          />
        );
      case 3:
        answers = [
          'soft and quiet',
          'not too quiet and not too loud',
          'fast and loud',
        ];
        return (
          <Question
            type="energy"
            value={energy}
            question="Give me something"
            answers={answers}
            handleChange={this.props.handleChange}
            handleButtonClick={this.handleButtonClick}
          />
        );
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div style={{ display: 'grid', justifyContent: 'center', padding: '80px 20px 20px 20px' }}>
        <h3 style={{ textAlign: 'center' }}>{ this.state.questionNumber } / 3</h3>
        { this.renderQuestions() }
      </div>
    );
  }
}

Quiz.propTypes = {
  handleChange: PropTypes.func.isRequired,
  submitAnswers: PropTypes.func.isRequired,
  mood: PropTypes.string.isRequired,
  danceability: PropTypes.string.isRequired,
  energy: PropTypes.string.isRequired,
};

export default Quiz;
