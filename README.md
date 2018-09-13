# songs-for-my-mood

Fullstack React and Node application for generating playlist based on user's mood.

Live: https://songsformymood.herokuapp.com/

### User stories:

1. You can generate songs based on your current mood.

2. You can create a Spotify playlist.


### Getting started

```
> git clone https://github.com/anya92/songs-for-my-mood
> cd songs-for-my-mood
> yarn install
```

#### Create `variables.env` file with:

`SPOTIFY_CLIENT_ID` - Spotify Web API Client ID

`SPOTIFY_CLIENT_SECRET` - Spotify Web API Client Secret

`DATABASE_URL` - Mongo Database URL

`SECRET` - secret for express-session

`KEY` - key for express-session

`AXIOS_BASE_URL` - base url for axios instance (e.g. `http://localhost:8080`)


```
> yarn dev
```

### Built with:

- React & Redux
- Spotify Web API
- Spotify Authentication with Passport
- Styled Components for styling
