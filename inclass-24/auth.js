const md5 = require('md5')

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const FacebookStrategy = require('passport-facebook').Strategy;

const redis = requires('redis').createClient(process.env.REDIS_URL)

const users = []
const sessions = {}
let numSessions = 0
const cookie = "sid"
const hashCode = "aycarambas"
app = express();

const login = (req, res) => {
    if(!req.body.username){
        res.sendStatus(400)
        return
    }

    if(!req.body.password){
        res.sendStatus(400)
        return
    }

    const userObj = users.filter(({username}) => {
        return username === req.body.username
    })[0]
  
    if (!userObj || !userObj.salt || !userObj.hash) {
        res.sendStatus(401)
        return
    }
    if(md5('${hashCode}${req.body.password}${requestedUser.salt}') != userObj.hash) {
        res.sendStatus(401)
        return
    }

    numSessions = numSessions + 1

    const currentDate = new Date()
    const sid = '${hashCode}${req.body.password}${requestedUser.salt}${currentDate}${numSessions}'

    sessions[sid] = userObj.username

    redis.hmset(sid, userObj)

    res.cookie(cookie, '${sid}', { maxAge: 3600*1000, httpOnly: true })
    res.send({result: "success", username: req.body.username})
}

const logout = (req, res) => {
//    req.logout();
//    res.redirect('/')
    delete sessions[req.cookies[cookie]]
    res.cookie(cookie, "", { httpOnly: true })
    res.send("OK")
}

const isLoggedin = (req, res, next) => {
/*    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }*/
    const sid = req.cookies[cookie]
    if (!sid) {
         return res.sendStatus(401)
    }
    
    const username = sessions[sid]

    if (!username) {
        return res.sendStatus(400)
    }
    req.body.username = username
    next()
}

const register = (req, res) => {
    const salt = Math.random() * 1000
    const hash = md5('${hashCode}${req.body.password}${salt}')
    users.push({ 
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob,
        zipcode: req.body.zipcode,
        hash: hash,
        salt: salt
    })
    res.send({result: "success", username: req.body.username})
}

function profile(req, res) {
    res.send('temp', req.user)
}

function fail(req, res) {
    res.send('fail')
}

const hello = (req, res)  => {
    res.send('hello world')
}

app.use((session({secret: '4c3b7576763032d51186d8cc77fada0d'})));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

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

app.use('/login', passport.authenticate('facebook', {scope:'email'}))
app.use('callback', passport.authenticate('facebook', {
    successRedirect:'/profile', failureRedirect:'/fail'}))
app.use('/profile', isLoggedin, profile)
app.use('/logout', logout)
app.use('/fail', fail)

module.exports = (app) => {
    app.post('/login', login)
    app.put('/logout', isLoggedIn, logout)
    app.post('/register', register)
    app.put('/', hello)
}
