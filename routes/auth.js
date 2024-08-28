import express from 'express';
import User from '../models/User.js';
import passport from 'passport';

const router = express.Router();

// Render Login and Register Pages
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// Handle Registration
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

// Handle Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Handle Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
