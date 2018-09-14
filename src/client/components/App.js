import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  oneOf,
  oneOfType,
  bool,
  shape,
  string,
  arrayOf,
  func,
} from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { fetchRecommendedSongs, createPlaylist } from '../actions';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Quiz from './Quiz';
import Results from './Results';

import { Container } from './styled/Layout';
import { Button, ButtonWithLink } from './styled/Buttons';
import media from './styled/mediaQueries';

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
`;

const Loader = styled.div`
  height: 100%;
  color: #f7f1e3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  state = {
    startQuiz: false,
    fetchingData: false,
    mood: { title: '', id: null },
    danceability: { title: '', id: null },
    energy: { title: '', id: null },
    playing: false,
    audio: null,
    playingURL: '',
    playlist: false,
  }

  startQuiz = () => {
    this.setState(() => ({ startQuiz: true }));
  }

  handleAnswerClick = (type, answer) => {
    this.setState(() => ({
      [type]: answer,
    }));
  }

  submitAnswers = () => {
    const {
      mood, danceability, energy, audio,
    } = this.state;
    if (audio) audio.pause();
    this.setState(() => ({
      startQuiz: false,
      fetchingData: true,
      playing: false,
      playingURL: '',
      audio: null,
      playlist: false,
    }));
    this.props.fetchRecommendedSongs(mood, danceability, energy);
  }

  playAudio = (preview_url) => {
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

  createPlaylist = () => {
    const { data: tracks } = this.props.songs;
    const uris = tracks.map(track => track.uri);
    this.props.createPlaylist(uris);
    this.setState(() => ({ playlist: true }));
  }

  resetQuiz = () => {
    this.setState(() => ({
      startQuiz: false,
      fetchingData: false,
      mood: { title: '', id: null },
      danceability: { title: '', id: null },
      energy: { title: '', id: null },
      playing: false,
      audio: null,
      playingURL: '',
      playlist: false,
    }));
  }

  renderPlaylistButton = () => {
    const { playlist } = this.state;
    const { playlist: { data, status } } = this.props;
    if (!playlist) {
      return <Button onClick={() => this.createPlaylist()}>Add to Spotify</Button>;
    } else if (status === 'loading') {
      return <Button>Loading...</Button>;
    } else if (status === 'success') {
      return <ButtonWithLink><a href={data.uri}>Open in Spotify</a></ButtonWithLink>;
    } else if (status === 'error') {
      return <div>Something wrong happened... Try again later.</div>;
    }
    return <div />;
  }

  renderContent = () => {
    const { auth, songs: { pending, data, error } } = this.props;
    const {
      startQuiz, fetchingData, mood, danceability, energy,
    } = this.state;
    if (!auth || (!startQuiz && !fetchingData)) {
      return <Home logged={auth} startQuiz={this.startQuiz} />;
    } else if (startQuiz) {
      return (
        <div>
          <Header resetQuiz={this.resetQuiz} />
          <Quiz
            submitAnswers={this.submitAnswers}
            handleAnswerClick={this.handleAnswerClick}
            mood={mood}
            danceability={danceability}
            energy={energy}
          />
        </div>
      );
    } else if (pending) {
      return <Loader>Loading...</Loader>;
    } else if (error) {
      return <div>Something wrong happened... Try again later.</div>;
    }
    return (
      <div>
        <Header resetQuiz={this.resetQuiz} />
        <Results
          songs={data}
          submitAnswers={this.submitAnswers}
          renderPlaylistButton={this.renderPlaylistButton}
          playAudio={this.playAudio}
          playingURL={this.state.playingURL}
        />
      </div>
    );
  }

  render() {
    return this.props.auth == null ? <div>Loading...</div> : (
      <Container>        
        { this.renderContent() }
        <Footer />
      </Container>
    );
  }
}

App.propTypes = {
  auth: oneOfType([
    oneOf([null]),
    bool,
    shape({}),
  ]).isRequired,
  songs: shape({
    pending: bool,
    error: oneOfType([bool, string]),
    data: arrayOf(shape({})),
  }).isRequired,
  playlist: shape({}).isRequired,
  fetchRecommendedSongs: func.isRequired,
  createPlaylist: func.isRequired,
};

function mapStateToProps({ auth, songs, playlist }) {
  return {
    auth,
    songs,
    playlist,
  };
}

export default connect(mapStateToProps, {
  fetchRecommendedSongs,
  createPlaylist,
})(App);
