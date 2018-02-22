import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { fetchCurrentUser } from '../actions';

import Header from './Header';
import Quiz from './Quiz';
import { LoginButton, Button } from './styled/Buttons';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 1.2em;
    font-family: lato ,ubuntu, sans-serif;
    background-color: #52c7f9;
    color: #F0F0F0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valence: '',
      energy: '',
      danceabilty: '',
      startQuiz: false,
    };
  }

  renderContent() {
    const { auth } = this.props;
    const { startQuiz } = this.state;
    if (!auth) {
      return <LoginButton><a href="/auth/spotify">Login</a></LoginButton>;
    } else if (!startQuiz) {
      return <Button onClick={() => this.setState({ startQuiz: true })}>Start</Button>;
    }
    return <Quiz />;
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

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
