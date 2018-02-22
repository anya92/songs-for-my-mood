import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { fetchCurrentUser } from '../actions';

import Header from './Header';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
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

export const LoginButton = styled.div`
  margin: 20px 0;
  height: 100px;
  display: inline-flex;
  align-items: center;
  a {
    font-size: 20px;
    font-weight: 700;
    background-color: khaki;
    border-radius: 8px;
    position: relative;
    box-shadow: 0px 6px #f5eeb0;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #555;
    text-decoration: none;
    padding: 20px 80px;
    &:hover {
      top: 2px;
      box-shadow: 0px 4px #f5eeb0;
    }
    &:active {
      top: 6px;
      box-shadow: none;
    }
  }
`;

const Button = styled.button`
  font-size: 20px;
  font-weight: 700;
  background-color: khaki;
  border: none;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 6px #f5eeb0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #555;
  outline: none;
  padding: 20px 80px;
  margin: 20px 0;
  cursor: pointer;
  &:hover {
    top: 2px;
    box-shadow: 0px 4px #f5eeb0;
  }
  &:active {
    top: 6px;
    box-shadow: none;
  }
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
      return <div>Game Start</div>;
    
  }

  render() {
    return this.props.auth == null ? <div>Loading...</div> : (
      <Container>
        <Header auth={this.props.auth} />
        <div>songsForMyMood</div>
        <div>Create playlist based on your current mood.</div>
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
