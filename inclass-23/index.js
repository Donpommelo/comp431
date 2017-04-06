const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const FacebookStrategy = require('passport-facebook').Strategy;

app = express();
app.use((session({secret: '4c3b7576763032d51186d8cc77fada0d'})));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const users = []

passport.serializeUser(function(user, done) {
    users[user.id] = user;
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    const user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done) {
        process.nextTick(function(){
            return done(null, profile)
        })
    })
)

function logout(req, res) {
    req.logout();
    res.redirect('/')
}

function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

function profile(req, res) {
    res.send('temp', req.user)
}

function fail(req, res) {
    res.send('fail')
}

function hello(req, res) {
    res.send('hello world')
}

app.use('/login', passport.authenticate('facebook', {scope:'email'}))
app.use('callback', passport.authenticate('facebook', {
    successRedirect:'/profile', failureRedirect:'/fail'}))
app.use('/profile', isLoggedin, profile)
app.use('/fail', fail)
app.use('/logout', logout)
app.use('/', hello)
