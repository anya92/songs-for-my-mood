import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { fetchCurrentUser, fetchRecommendedSongs } from '../actions';

import Header from './Header';
import Quiz from './Quiz';
import Tracks from './Tracks';
import { LoginButton, Button } from './styled/Buttons';

// import sampleData from '../helpers/sampleData';

injectGlobal`
  body {
    font-size: 1.2em;
    font-family: lato ,ubuntu, sans-serif;
    color: #F0F0F0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 15px 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startQuiz: false,
      fetchingData: false,
      mood: null, 
      danceability: null,
      energy: null,
    };

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
  }

  handleAnswerClick(type, answer) {
    this.setState(() => ({
      [type]: answer,
    }));
  }

  submitAnswers() {
    this.setState(() => ({ startQuiz: false, fetchingData: true }));
    const { mood, danceability, energy } = this.state;
    this.props.fetchRecommendedSongs(mood, danceability, energy);
  }

  renderContent() {
    const { auth, songs: { data, status} } = this.props;
    const { startQuiz, fetchingData, mood, danceability, energy } = this.state;
    if (!auth) {
      return <LoginButton><a href="/auth/spotify">Login</a></LoginButton>;
    } else if (!startQuiz && !fetchingData) {
      return <Button onClick={() => this.setState({ startQuiz: true })}>Start</Button>;
    } else if (startQuiz) {
      return (
        <Quiz
          submitAnswers={this.submitAnswers}
          handleAnswerClick={this.handleAnswerClick}
          mood={mood}
          danceability={danceability}
          energy={energy}
        />
      );
    } else if (status === 'loading') {
      return <div>Fetching data...</div>;
    } else if (status === 'error') {
      return <div>Something wrong happed...</div>;
    } else if (status === 'success') {
      return (
        <div>
          <h1>Songs:</h1>
          <button onClick={() => this.submitAnswers()}>Get again</button>
          <Tracks songs={data} />
        </div>
      );
    }
    return <div />;
  }

  render() {
    return this.props.auth == null ? <div>Loading...</div> : (
      <Container>
        <Header auth={this.props.auth} />
        {/* <div>songsForMyMood</div>
        <div>Create playlist based on your current mood.</div> */}
        { this.renderContent() }
      </Container>
    );
  }
}

function mapStateToProps({ auth, songs }) {
  return {
    auth,
    songs,
  };
}

export default connect(mapStateToProps, { fetchCurrentUser, fetchRecommendedSongs })(App);
