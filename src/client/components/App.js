import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { fetchCurrentUser, fetchRecommendedSongs, createPlaylist } from '../actions';

import Home from './Home';
import Header from './Header';
import Quiz from './Quiz';
import Tracks from './Tracks';

import { Container } from './styled/Layout';
import { Button } from './styled/Buttons';
import media from './styled/mediaQueries';

import { getFullTime } from '../helpers/convertMS';

// import sampleData from '../helpers/sampleData';

injectGlobal`
  body {
    position: relative;
    padding-bottom: 144px;
    ${media.small`
      padding-bottom: 128px;
    `}
    ${media.medium`
      padding-bottom: 56px;
    `}
  }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 20px;
  color: #555;
  background-color: #f7f1e3;
  font-size: 14px;
  div {
    margin: 10px 5px;
  }
  a {
    color: #555;
    font-weight: 600;
  }
  ${media.medium`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startQuiz: true,
      fetchingData: false,
      mood: { title: '', id: null },
      danceability: { title: '', id: null },
      energy: { title: '', id: null },
      playing: false,
      audio: null,
      playingURL: '',
    };

    this.startQuiz = this.startQuiz.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  startQuiz() {
    this.setState(() => ({ startQuiz: true }));
  }

  handleAnswerClick(type, answer) {
    this.setState(() => ({
      [type]: answer,
    }));
  }

  submitAnswers() {
    const {
      mood, danceability, energy, audio,
    } = this.state;
    audio && audio.pause();
    this.setState(() => ({
      startQuiz: false, fetchingData: true, playing: false, playingURL: '', audio: null,
    }));
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
    if (!auth || (!startQuiz && !fetchingData)) {
      return <Home logged={auth} startQuiz={this.startQuiz} />;
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
      return <div>Something wrong happened... Try again later.</div>;
    } else if (status === 'success') {
      return (
        <div>
          <div>Songs:</div>
          <Button onClick={() => this.submitAnswers()}>Get again</Button>
          { getFullTime(data.reduce((total, song) => total + song.duration_ms, 0)) }
          <Button onClick={() => this.createPlaylist()}>Add to Spotify</Button>
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
        { this.renderContent() }
        <Footer>
          <div>enjoyed with <a href="https://developer.spotify.com/web-api/" target="_blank" rel="noopener noreferrer">Spotify Web API</a></div>
          <div>icons designed by Vectors Market, Twitter and Roundicons from <a href="https://flaticon.com" target="_blank" rel="noopener noreferrer">Flaticon</a></div>
          <div>created by <a href="https://github.com/anya92" target="_blank" rel="noopener noreferrer">anya92</a></div>
        </Footer>
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
