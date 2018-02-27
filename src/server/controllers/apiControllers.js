import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';

// export const catchErrors = fn => {
//   return function(req, res, next) {
//     return fn(req, res, next).catch(next);
//   };
// };

export const checkAccessToken = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    console.log('refresh token');
    const response = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'refresh_token',
        refresh_token: req.session.refreshToken,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.SPOTIFY_CLIENT_ID,
        password: process.env.SPOTIFY_CLIENT_SECRET,
      },
    });
    res.cookie('accessToken', response.data.access_token, { maxAge: 3600 * 1000 });
    res.locals.accessToken = response.data.access_token;
    next();
  } else {
    next();
  }
};


const getUserTop = async (type, req, res) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/${type}?limit=10&time_range=short_term`,
    {
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
      },
    },
  );
  const random = type === 'tracks' ? _.sample(response.data.items, 3) : _.sample(response.data.items, 2);
  const seeds = random.map(track => track.id).join(',');
  return seeds;
};

export const getRecommendations = async (req, res) => {
  const tracksPromise = getUserTop('tracks', req, res);
  const artistsPromise = getUserTop('artists', req, res);
  const [seedTracks, seedArtists] = await Promise.all([tracksPromise, artistsPromise]);

  const {
    min_valence,
    max_valence,
    min_danceability,
    max_danceability,
    min_energy,
    max_energy,
  } = req.query;
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/recommendations',
      params: {
        seed_tracks: seedTracks,
        seed_artists: seedArtists,
        limit: 50,
        min_valence,
        max_valence,
        min_danceability,
        max_danceability,
        min_energy,
        max_energy,
      },
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
      },
    });

    const tracks = response.data.tracks.map(({
      id,
      name,
      uri,
      album,
      artists,
      preview_url,
      duration_ms,
    }) => ({
      id,
      name,
      artist: artists[0].name,
      album: {
        name: album.name,
        image: album.images[album.images.length - 1].url,
      },
      uri,
      preview_url,
      duration_ms,
    }));
    res.json(tracks);
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.statusText,
    });
  }
};


export const createPlaylist = async (req, res, next) => {
  const name = `songsForMyMood: ${moment(Date.now()).format('MMM Do YYYY')}`;
  const playlist = await axios({
    url: `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists`,
    method: 'post',
    data: {
      name,
    },
    headers: {
      Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  res.locals.playlistId = playlist.data.id;
  next();
};

export const addTracks = async (req, res) => {
  const { uris } = req.query;
  try {
    await axios({
      url: `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists/${res.locals.playlistId}/tracks`,
      method: 'post',
      data: {
        uris,
      },
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    // const response = await axios({
    //   url: `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists/${res.locals.playlistId}`,
    //   method: 'get',
    //   headers: {
    //     Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
    //   },
    // });
    // const playlist = { uri: response.data.uri, image: response.data.images[0].url };
    const playlist = { uri: `spotify:${req.user.spotifyId}:playlist:${res.locals.playlistId}` };
    res.json(playlist);
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.statusText,
    });
  }
};
