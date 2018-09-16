import React from 'react';
import PropTypes from 'prop-types';

import { Content, Title, Description } from './styled/Home';
import { ButtonWithLink, Button } from './styled/Buttons';

const Home = ({ logged, startQuiz }) => (
  <Content>
    <Title>songs for my mood</Title>
    <Description>
        Generate songs based on your current mood and create a Spotify playlist.
    </Description>
    {
      !logged
      ? (
        <ButtonWithLink>
          <a href="/auth/spotify">Login with Spotify</a>
        </ButtonWithLink>
      ) : (
        <div>
          <Button style={{ marginRight: '20px' }} onClick={() => startQuiz()}>Start</Button>
          <ButtonWithLink light>
            <a href="/auth/logout">Logout</a>
          </ButtonWithLink>
        </div>
      )
    }
  </Content>
);

Home.propTypes = {
  logged: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default Home;
