const headlines = {user1: "test1", user2: "test2"}
const emails = {user1: "user1@rice.edu", user2: "user2@rice.edu"}
const zipcodes = {user1: "11111", user2: "22222"}
const avatars = {
    user1: "https://upload.wikimedia.org/wikipedia/commons/7/78/JRC-117_Rapid_Sakuma_Rail_Park_200907.jpg",
    user2: "https://upload.wikimedia.org/wikipedia/commons/6/62/983_Oslo._Utsikt_fra_Ekebergrestauranten_-_no-nb_digifoto_20151102_00016_bldsa_PK11910.jpg"}

const index = (req, res) => {
     res.send({ hello: 'world' })
}


const getHeadlines = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }

    const users = req.params.users ? req.params.users.split(',') : [req.user]
    res.send({ headlines: users.map((user) => {
        return {username: user, headline: Object.keys(headlines).filter((key1) => key1.indexOf(user) !== -1 )
        .map((key2) => headlines[key2])}
        })
    })
}

const putHeadlines = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    headlines[req.user] = req.body["headline"]
    res.send({username: req.user, headline: req.body["headline"]})
}

const getEmails = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    const user = req.params.user ? req.params.user : [req.user]
    res.send({username: user, email: emails[user] ? emails[user] : emails[req.user]})
}

const putEmails = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    emails[req.user] = req.body["email"]
    res.send({username: req.user, email: req.body["email"]})
}

const getZipcodes = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    const user = req.params.user ? req.params.user : [req.user]
    res.send({username: user, zipcode: zipcodes[user] ? zipcodes[user] : zipcodes[req.user]})
}

const putZipcodes = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    emails[req.user] = req.body["zipcode"]
    res.send({username: req.user, zipcode: req.body["zipcode"]})
}

const getAvatars = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    res.send({ avatars: users.map((user) => {
        return {username: user, avatar: Object.keys(avatars).filter((key1) => key1.indexOf(user) !== -1 )
        .map((key2) => avatars[key2])}
        })
    })
}

const putAvatars = (req, res) => {
    if (!req.user) {
        req.user = 'user1'
    }
    avatars[req.user] = req.body["avatar"]
    res.send({username: req.user, avatar: req.body["avatar"]})
}

module.exports = app => {
    app.get('/', index)
    app.get('/headlines/:users?', getHeadlines)
    app.get('/email/:user?', getEmails)
    app.get('/zipcode/:user?', getZipcodes)
    app.get('/avatars/:users?', getAvatars)
    app.put('/headline', putHeadlines)
    app.put('/email', putEmails)
    app.put('/zipcode', putZipcodes)
    app.put('/avatar', putAvatars)
}
