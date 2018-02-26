import React from 'react';
import styled from 'styled-components';

import convertMS from '../helpers/convertMS';
import playIcon from '../assets/play.png';
import pauseIcon from '../assets/pause.png';

const TracksContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: #555;
  padding: 20px 0;
  font-family: ubuntu;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Track = styled.div`
  padding: 10px 5px;
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    
  }
`;

const Image = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const Info = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1;
`;

const Title = styled.div`
  margin-bottom: 10px;
  a {
    text-transform: uppercase;
    font-size: 1.15rem;
    color: #333;
    font-weight: 500;
    text-decoration: none;
  }
`;

const Artist = styled.div`
  font-size: 1rem;  
`;

const Play = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Icon = styled.div`
margin-bottom: 10px;
  img {
    width: 18px;
    cursor: pointer;
  }
`;

const Time = styled.div`
  font-size: .9rem;
  font-weight: 300;
`;

const Tracks = ({ songs, playAudio, playingURL }) => (
  <TracksContainer>
    {
      songs.map(({
 id, uri, name, album, artist, duration_ms, preview_url,
}) => (
  <Track key={id}>
    <Image><a href={uri}><img src={album.image} alt={album.name} /></a></Image>
    <Info>
      <Title><a href={uri}>{name}</a></Title>
      <Artist>{artist}</Artist>
    </Info>
    <Play>
      {
        preview_url && (
          <Icon onClick={() => playAudio(preview_url)}>
            <img
              src={playingURL === preview_url ? pauseIcon : playIcon}
              alt={playingURL === preview_url ? 'pause' : 'play'}
            />
          </Icon>
        )
      }
      <Time>{convertMS(duration_ms)}</Time>
    </Play>
  </Track>
      ))
    }
  </TracksContainer>
);

export default Tracks;
