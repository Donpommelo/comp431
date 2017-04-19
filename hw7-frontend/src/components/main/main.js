import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from './nav'
import Headline from './headline'
import Followers from './followers'
import Articles from '../article/article'
import ArticleView from '../article/articleView'
import { addFollow } from './followingActions'
import { filterArticles } from '../article/articleActions'
import { initialize } from '../../actions'

export const Main = ({ message, followers, articles, follow, filter, init }) => {

    //This runs once upon logging in. Sets up all account info from server
    if (message.indexOf('Login Successful!') == 0 && articles.length == 0 && followers.length == 0) {
        init()
    }

    let newFollow, filterKeyword;

    const _addFollow = () => {
        if (newFollow && followers) {
            follow(newFollow.value, followers);
            newFollow.value='';
        }
    };

    const _filterArticles = () => {
        if (filterKeyword) {
            filter(filterKeyword.value);
            filterKeyword.value='';
        }
    };

    return (
        <div>
            <Nav/>
            <Headline/>

            <div id="followList">
                <input type="text" id="newFollowName" placeholder="Follow Another User" ref={(node) => newFollow = node} />
                <button id="newFollowAdd" onClick={_addFollow}>Follow</button>
                <ul id="visibleFollowers">
                    {followers.map((name) => (
                        <Followers key={name} name={name} />
                    ))}
                </ul>
            </div>


            <div id="articleList">
                <input id="filterKeyword" type="text" placeholder="Filter Articles" ref={(node) => filterKeyword = node} />
                <button id="articleFilter" onClick={_filterArticles}>Filter</button>
                <ArticleView key={1} articles={articles}/>
             </div>
            
            
            <b id="message">{message}</b>
        </div>
    )
};

Main.propTypes = {
    message: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired,
    follow: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ message: state.message, followers: state.followers, articles: state.articles }),
    (dispatch) => ({
        follow: (newFollow, follows) => addFollow(newFollow, follows)(dispatch),
        filter: (keyword) => filterArticles(keyword)(dispatch),
        init: () => initialize()(dispatch),
    })
)(Main)