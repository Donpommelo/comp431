import { expect } from 'chai'
import { driver, go, sleep, findId, findElements, findCSS, By } from './selenium'
import common from './common'

describe('Test End to End Frontend', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should create a new article and validate the article appears in the feed', (done) => {

        const newArticle = 'test article.'

        sleep(500)
        .then(findId('newArticleText').clear())
        .then(findId('newArticleText').sendKeys(newArticle))
        .then(findId('postArticle').click())
        .then(sleep(2000))
        .then(findId('visibleArticles').findElement(By.className('articleText'))
            .then(texts => texts[0].getText)
            .then(text => {
                expect(text.to.equal(newArticle))
            })
            .then(done)
        )
        .catch(done)
    })

    it('should edit an article and validate the article text has updated', (done) => {
        
        const newArticle = 'test article.'

        sleep(500)
        .then(findId('newArticleText').clear())
        .then(findId('newArticleText').sendKeys('test article'))
        .then(findId('postArticle').click())
        .then(sleep(2000))
        .then(findId('visibleArticles').findElement(By.className('editArticle'))
            .then(buttons => buttons[0].click())
            .then(sleep(2000))
            .then(findId('visibleArticles').findElement(By.className('articleEdits'))
                .then(articles => articles[0].sendKeys(newArticle))
                .then(findId('visibleArticles').findElement(By.className('submitEdits'))
                    .then(buttons => buttons[0].click())
                    .then(sleep(2000))
                    .then(findId('visibleArticles').findElement(By.className('articleText'))
                        .then(texts => texts[0].getText())
                        .then(text => {
                            expect(text.to.equal(newArticle))
                        })
                        .then(done)
                    )
                )
            )
        )
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
            })
            .then(done))
        .catch(done)
    })

    it('should count the number of followed users', (done) => {
        sleep(500)
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => expect(list.length).to.eql(3)))
    })

    it('should add the user "Follower" to the list of followed users and verify the count increases by one', (done) => {
        sleep(500)
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => {const listLength = list.length}))
        .then(findId('newFollowName').clear())
        .then(findId('newFollowName').sendKeys('Follower'))
        .then(findId('newFollowadd').click())
        .then(sleep(2000))
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => expect(listLength + 1).to.eql(list.length)))
        .then(done)
    })

    it('should remove the user "Follower" from the list of followed users and verify the count decreases by one', (done) => {
        sleep(500)
        .then(findId('newFollowName').clear())
        .then(findId('newFollowName').sendKeys('Follower'))
        .then(findId('newFollowadd').click())
        .then(sleep(2000))
        .then(findId('followList').findElements(By.className('follower'))
            .then(list => {const listLength = list.length}))
        .then(findId('followList').findElements(By.className('unfollow'))
            .then(list => list[0].click())
            .then(sleep(2000))
            .then(findId('followList').findElements(By.className('follower'))
            .then(list => expect(listLength - 1).to.eql(list.length))
            .then(done)
            )
        )
        .catch(done)
    })

    it('should search for "Only One Article Like This" and verify only one article shows, and verify the author', (done) => {
        sleep(500)
        .then(findId('filterKeyword').clear())
        .then(findId('filterKeyword').sendKeys('Only One Article Like This'))
        .then(findId('articleFilter')).click()
        .then(sleep(2000))
        .then(findId('visibleArticles').findElements(By.className('articleAuthor'))
            .then(texts => {
                expect(texts.length).to.eql(1)
                expect(texts[0]).to.eql('zht1test')
            })
        )

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
        .then(findId('currentEmail').text()
            .then(text => {
                expect(text).to.equal(newEmail)
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
    })

    it('should navigate to the profile view, Update the users zipcode and verify', (done) => {
       
        const newZipcode = "77479"

        sleep(500)
        .then(findId('toProfile').click())
        .then(findId('newZip').clear())
        .then(findId('newZip').sendKeys(newEmail))
        .then(findId('newProfileInfo').click())
        .then(findId('currentZip').text()
            .then(text => {
                expect(text).to.equal(newZipcode)
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
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
        .then(findId('message').text()
            .then(text => {
                expect(text).to.equal('You cannot update your password, Sorry. ')
            })
            .then(findId('navigation').click())
            .then(sleep(2000))
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})