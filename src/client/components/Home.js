import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ButtonWithLink, Button } from './styled/Buttons';

const Content = styled.div`
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`;

export const Title = styled.div`
  font-size: 12vmin;
  font-family: 'gochi hand', cursive;
  text-align: left;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  text-align: left;
  line-height: 1.6;
`;

const Home = ({ logged, startQuiz }) => (
  <Content>
    <Title>songs for my mood</Title>
    <Description>
        Generate songs based on your current mood and create a Spotify playlist.
    </Description>
    {
      !logged
      ? <ButtonWithLink><a href="/auth/spotify">Login with Spotify</a></ButtonWithLink>
      : <div><Button onClick={() => startQuiz()}>Start</Button></div>
    }
  </Content>
);

Home.propTypes = {
  logged: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default Home;
