import React, { Component } from 'react';

import sadEmoji from '../assets/sad.png';
import angryEmoji from '../assets/angry.png';
import okEmoji from '../assets/ok.png';
import cheerfulEmoji from '../assets/cheerful.png';
import happyEmoji from '../assets/happy.png';
import bedIcon from '../assets/bed.png';
import danceIcon from '../assets/dance.png';
import headphonesEmoji from '../assets/headphones.png';
import classicalIcon from '../assets/classical.png';
import popIcon from '../assets/pop.png';
import metalIcon from '../assets/metal.png';

import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 1,
      mood: null,
      danceability: null,
      energy: null,
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleAnswerClick(type, answer) {
    this.setState(() => ({
      [type]: answer,
    }));
  }

  handleButtonClick() {
    if (this.state.questionNumber <= 2) {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1,
      }));
    } else {
      const { mood, danceability, energy } = this.state;
      this.props.submitAnswers(mood.id, danceability.id, energy.id);
    }
  }

  renderQuestions() {
    const {
      questionNumber, mood, danceability, energy
    } = this.state;
    let answers;
    switch (questionNumber) {
      case 1:
        answers = [
          { id: 1, title: 'sad', icon: sadEmoji },
          { id: 2, title: 'angry', icon: angryEmoji },
          { id: 3, title: 'ok', icon: okEmoji },
          { id: 4, title: 'cheerful', icon: cheerfulEmoji },
          { id: 5, title: 'happy', icon: happyEmoji },
        ];
        return (
          <Question
            type="mood"
            value={mood}
            question="Today I am"
            answers={answers}
            handleAnswerClick={this.handleAnswerClick}
            handleButtonClick={this.handleButtonClick}
          />
        );
      case 2:
        answers = [
          { id: 1, title: 'lay in my bed', icon: bedIcon },
          { id: 2, title: 'listen to music with my headphones', icon: headphonesEmoji },
          { id: 3, title: 'dance all day... and night!', icon: danceIcon },
        ];
        return (
          <Question
            type="danceability"
            value={danceability}
            question="I want to"
            answers={answers}
            handleAnswerClick={this.handleAnswerClick}
            handleButtonClick={this.handleButtonClick}
          />
        );
      case 3:
        answers = [
          { id: 1, title: 'soft and quiet', icon: classicalIcon },
          { id: 2, title: 'not too quiet and not too loud', icon: popIcon },
          { id: 3, title: 'fast and loud', icon: metalIcon },
        ];
        return (
          <Question
            type="energy"
            value={energy}
            question="Give me something"
            answers={answers}
            handleAnswerClick={this.handleAnswerClick}
            handleButtonClick={this.handleButtonClick}
          />
        );
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        { this.renderQuestions() }
        <div>Icons designed by Vectors Market, Twitter and Roundicons from Flaticon</div>
      </div>
    );
  }
}

export default Quiz;
