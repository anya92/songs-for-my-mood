import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { fetchCurrentUser, fetchRecommendedSongs, createPlaylist } from '../actions';

import Header from './Header';
import Quiz from './Quiz';
import Tracks from './Tracks';
import { LoginButton, Button } from './styled/Buttons';

import { getFullTime } from '../helpers/convertMS';

// import sampleData from '../helpers/sampleData';

injectGlobal`
  body {
    font-size: 1.2em;
    font-family: lato ,ubuntu, sans-serif;
    color: #555;
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
      playing: false,
      audio: null,
      playingURL: '',
    };

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  handleAnswerClick(type, answer) {
    this.setState(() => ({
      [type]: answer,
    }));
  }

  submitAnswers() {
    const { mood, danceability, energy, audio } = this.state;
    audio && audio.pause();
    this.setState(() => ({ startQuiz: false, fetchingData: true, playing: false, playingURL: '', audio: null }));
    this.props.fetchRecommendedSongs(mood, danceability, energy);
  }

  playAudio(preview_url) {
    const audio = new Audio(preview_url);
    audio.onended = () => this.setState(() => ({ playing: false, playingURL: '' }));
    if (!this.state.playing) {
      audio.play();
      this.setState(() => ({
        playing: true,
        playingURL: preview_url,
        audio,
      }));
    } else {
      if (this.state.playingURL === preview_url) {
        this.state.audio.pause();
        this.setState(() => ({
          playing: false,
          playingURL: '',
        }));
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState(() => ({
          playing: true,
          playingURL: preview_url,
          audio,
        }));
      }
    }
  }

  createPlaylist() {
    const { data: tracks } = this.props.songs;
    const uris = tracks.map(track => track.uri);
    this.props.createPlaylist(uris);
  }

  renderContent() {
    const { auth, songs: { data, status } } = this.props;
    const {
      startQuiz, fetchingData, mood, danceability, energy,
    } = this.state;
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
      return <div>Something wrong happened...</div>;
    } else if (status === 'success') {
      return (
        <div>
          <h1>Songs:</h1>
          <button onClick={() => this.submitAnswers()}>Get again</button>
          { getFullTime(data.reduce((total, song) => total + song.duration_ms, 0)) }
          <button onClick={() => this.createPlaylist()}>Add to Spotify</button>
          <Tracks
            songs={data}
            playAudio={this.playAudio}
            playingURL={this.state.playingURL}
          />
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

function mapStateToProps({ auth, songs, playlist }) {
  return {
    auth,
    songs,
    playlist,
  };
}

export default connect(mapStateToProps, { fetchCurrentUser, fetchRecommendedSongs, createPlaylist })(App);
