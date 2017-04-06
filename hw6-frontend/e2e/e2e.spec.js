import { expect } from 'chai'
import { driver, go, sleep, findId, findElements, findCSS, By } from './selenium'

describe('Test End to End Authentication', () => {

    it('should register a new user', (done) => {
        go()
        .then(sleep(500))
        .then(findId('regisName').clear())
        .then(findId('regisPw1').clear())
        .then(findId('regisPw2').clear())
        .then(findId('regisEmail').clear())
        .then(findId('regisPhone').clear())
        .then(findId('regisZip').clear())
        .then(findId('regisName').sendKeys('1'))
        .then(findId('regisPw1').sendKeys('1'))
        .then(findId('regisPw2').sendKeys('1'))
        .then(findId('regisEmail').sendKeys('zht1@rice.edu'))
        .then(findId('regisZip').sendKeys('11111'))
        .then(findId('regisBirth').sendKeys('11/11/1990'))
        .then(findId('regisAttempt').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf('Register Successful!')).to.equal(0)
            }))
        .then(done)
        .catch(done)
    })

    it('should log in as the test user', (done) => {
        go()
        .then(sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys('zht1test'))
        .then(findId('password').sendKeys('forever-dream-jump'))
        .then(findId('loginAttempt').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf('Login Successful!')).to.equal(0)
            }))
        .then(done))
        .catch(done)
    })

})

describe('Test End to End Frontend', () => {

    before('should log in', (done) => {
        go()
        .then(sleep(500))
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys('zht1test'))
        .then(findId('password').sendKeys('forever-dream-jump'))
        .then(findId('loginAttempt').click())
        .then(sleep(2000))
        .then(done)
    })

    it('should create a new article and validate the article appears in the feed', (done) => {

        const newArticle = 'test article.'

        sleep(500)
        .then(findId('newArticleText').clear())
        .then(findId('newArticleText').sendKeys(newArticle))
        .then(findId('postArticle').click()
            .then(sleep(2000))
            .then(findId('visibleArticles').findElements(By.className('singleArticle'))
                .then((articles) => {
                    articles[0].findElement(By.id('articleText'))
                    .then((article) => {
                        article.getText()
                        .then((text) => {
                            expect(text).to.eql(newArticle)
                        })
                    })
                })
            )
        )
        .then(done)
        .catch(done)
    })

    it('should edit an article and validate the article text has updated', (done) => {
        
        const newArticle = 'test article.'

        sleep(500)
        .then(findId('visibleArticles').findElements(By.className('singleArticle'))
            .then((articles) => {
                articles[0].findElement(By.id('editBegin')).click()
                .then(sleep(1000))
                .then(articles[0].findElement(By.id('articleEdits')).clear())
                .then(articles[0].findElement(By.id('articleEdits')).sendKeys(newArticle))
                .then(articles[0].findElement(By.id('editArticle')).click())
                .then(sleep(1000))
                .then(articles[0].findElement(By.id('articleText')).getText()
                    .then(response => expect(response).to.eql(newArticle))
                )
            })
        )
        .then(done)
        .catch(done)
    })

    it("Update the status headline and verify the change", (done) => {

        const newStatus ="kill me"

        sleep(500)
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(newStatus))
        .then(findId('headlineChange').click())
        .then(sleep(2000))
        .then(findId('currentHeadline').getText()
            .then(text => {
                expect(text).to.equal(newStatus)
            }))
        .then(done)
        .catch(done)
    })


    //Verify that we are getting aninteger length by counting the followed user list.
    it('should Count the number of followed users', (done) => {
        sleep(500)
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => expect(list.length).to.be.greaterThan(0)))
        .then(done)
        .catch(done)
    })

    it('should add the user "Follower" to the list of followed users and verify the count increases by one', (done) => {
        
        let listLength;

        sleep(500)
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => { listLength = list.length}))
        .then(findId('newFollowName').clear())
        .then(findId('newFollowName').sendKeys('Follower'))
        .then(findId('newFollowAdd').click())
        .then(sleep(2000))
        .then(findId('followList').findElements(By.className('follower'))
            .then((list) => expect(listLength + 1).to.eql(list.length)))
        .then(done)
    })

    it('should remove the user "Follower" from the list of followed users and verify the count decreases by one', (done) => {
        
        let listLength;

        sleep(500)
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => { listLength = list.length}))
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => list[list.length-1].findElement(By.id('unfollow')).click())
            .then(sleep(2000))
            .then(findId('followList').findElements(By.className('follower'))
                .then(list => expect(listLength - 1).to.eql(list.length))
            )
        )
        .then(done)
        .catch(done)
    })

    it('should search for "Only One Article Like This" and verify only one article shows, and verify the author', (done) => {
        sleep(500)
        .then(findId('filterKeyword').clear())
        .then(findId('filterKeyword').sendKeys('Only One Article Like This'))
        .then(findId('articleFilter').click())
        .then(sleep(2000))
        .then(findId('visibleArticles').findElements(By.className('singleArticle'))
            .then((articles) => {
                expect(articles.length).to.eql(1)
                articles[0].findElement(By.id('articleAuthor')).getText()
                .then((author) => expect(author).to.eql('zht1test'))
            })
        )
        .then(done)
        .catch(done)
    })

    it('should navigate to the profile view, Update the users email and verify', (done) => {

        const newEmail = "zht2@rice.edu"

        sleep(500)
        .then(findId('toProfile').click())
        .then(sleep(2000))
        .then(findId('newEmail').clear())
        .then(findId('newEmail').sendKeys(newEmail))
        .then(findId('newProfileInfo').click())
        .then(sleep(2000))
        .then(findId('currentEmail').getText()
            .then(text => {
                expect(text).contain(newEmail)
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
        .catch(done)
    })

    it('should navigate to the profile view, Update the users zipcode and verify', (done) => {

        const newZipcode = "77479"

        sleep(500)
        .then(findId('toProfile').click())
        .then(findId('newZip').clear())
        .then(findId('newZip').sendKeys(newZipcode))
        .then(findId('newProfileInfo').click())
        .then(sleep(2000))
        .then(findId('currentZip').getText()
            .then(text => {
                expect(text).contain(newZipcode)
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
        .catch(done)
    })

    it('should navigate to the profile view, Update the users password, verify a will not change message is returned', (done) => {
        
        const newPassword = "1e0di3f7"

        sleep(500)
        .then(findId('toProfile').click())
        .then(findId('newPw1').clear())
        .then(findId('newPw2').clear())
        .then(findId('newPw1').sendKeys(newPassword))
        .then(findId('newPw2').sendKeys(newPassword))
        .then(findId('newProfileInfo').click())
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('You cannot update your password, Sorry.')
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
        .catch(done)
    })
})
