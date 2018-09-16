import React from 'react';
import PropTypes from 'prop-types';

import convertMS from '../helpers/convertMS';

import { TracksContainer, Track, Image, Info, Title, Artist, Play, Time } from './styled/Tracks';

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
          <div onClick={playAudio}>
            {playingURL === preview_url ? 'pause' : 'play'}
          </div>
        )
      }
      <Time>{convertMS(duration_ms)}</Time>
    </Play>
  </Track>
      ))
    }
  </TracksContainer>
);

Tracks.propTypes = {
  songs: PropTypes.array.isRequired,
  playAudio: PropTypes.func.isRequired,
  playingURL: PropTypes.string.isRequired,
};

export default Tracks;
