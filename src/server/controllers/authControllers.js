import passport from 'passport';

export const login = passport.authenticate(
  'spotify',
  { scope: ['user-top-read', 'playlist-modify-public'] },
);

export const loginCallback = (req, res, next) => {
  passport.authenticate(
    'spotify',
    (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        req.session.refreshToken = info.refreshToken;
        res.cookie('accessToken', info.accessToken, { maxAge: 3600 * 1000 });
        return res.redirect('/');
      });
    },
  )(req, res, next);
};

export const getUser = (req, res) => {
  console.log('get User', req.user);
  res.send(req.user);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
