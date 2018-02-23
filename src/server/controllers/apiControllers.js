import axios from 'axios';
import _ from 'underscore';

export const catchErrors = fn => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	};
};

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

export const getRecommendations = (mood, danceability, energy) => async (req, res) => {
  const tracksPromise = getUserTop('tracks', req, res);
  const artistsPromise = getUserTop('artists', req, res);
  const [seedTracks, seedArtists] = await Promise.all([tracksPromise, artistsPromise]);

  const response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    params: {
      seed_tracks: seedTracks,
      seed_artists: seedArtists,
      limit: 50,
      min_valence: 0.0,
      max_valence: 0.33,
      min_danceability: 0.33,
      max_danceability: 0.66,
      min_energy: 0.0,
      max_energy: 0.33,
    },
    headers: {
      Authorization: `Bearer ${req.cookies.accessToken || res.locals.accessToken}`,
    },
  });
  const tracks = response.data.tracks.map(({ id, name, uri, album, artists, preview_url }) => ({
    id,
    name,
    artist: artists[0].name,
    album: {
      name: album.name,
      image: album.images[0].url,
    },
    uri,
    preview_url,
  }));
  res.json(tracks);
  // res.json(response.data);
};