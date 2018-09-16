import React from 'react';
import styled from 'styled-components';

import { getFullTime } from '../helpers/convertMS';
import { Button } from './styled/Buttons';
import Tracks from './Tracks';

const Results = styled.div`
  border: 2px solid #fff;
  background-color: #FFF;
  padding: 80px 20px 20px 20px;
  color: #555;
  min-height: 100vh;
  max-width: 100%;
`;

const Description = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  strong {
    font-weight: 500;
    font-size: 30px;
    color: #ffda79;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Time = styled.div`
  font-weight: 500;
  margin-top: 10px;
`;

export default ({ songs, submitAnswers, renderPlaylistButton, playAudio, playingURL  }) => (
  <Results>
    <Description>
      <div>
        Here are <strong>{songs.length} songs</strong> based on your current mood to add to your playlist. Enjoy!
      </div>
      <Time>{ getFullTime(songs.reduce((total, song) => total + song.duration_ms, 0)) }</Time>
      <ButtonsContainer>
        <Button onClick={() => submitAnswers()}>Generate again</Button>
        { renderPlaylistButton() }
      </ButtonsContainer>
    </Description>
    <Tracks
      songs={songs}
      playAudio={playAudio}
      playingURL={playingURL}
    />
  </Results>
);

