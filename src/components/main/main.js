import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Nav } from './nav'
import Headline from './headline'
import Followers from './followers'
import Articles from '../article/article'
import NewArticle from '../article/newArticle'
import { addFollow } from './followingActions'
import { filterArticles } from './followingActions'

export const Main = ({ message, followers, articles, addFollow, filterArticles }) => {

    let newFollow, filterKeyword;

    const _addFollow = () => {
        if (newFollow && followers) {
            addFollow(newFollow.value, followers);
            newFollow.value='';
        }
    };

    const _filterArticles = () => {
        if (filterKeyword) {
            filterArticles(filterKeyword.value);
            filterKeyword.value='';
        }
    };

    return (
        <div>
            <Nav/>
            <Headline/>

            <div id="followList">
                <input type="text" placeholder="Follow Another User" ref={(node) => newFollow = node} />
                <button onClick={_addFollow}>Follow</button>
                <ul >
                    {followers.map(({name, status, avatar}) => (
                        <Followers key={name} name={name} status={status} avatar={avatar} />
                    ))}
                </ul>
            </div>

            <NewArticle/>

            <div id="articleList">
                <input type="text" placeholder="Filter Articles" ref={(node) => filterKeyword = node} />
                <button onClick={_filterArticles}>Filter</button>
                <ul >
                    {articles.filter((article) => article.visible).map(({pic, text, author, date, id}) => (
                        <Articles key={id} pic={pic} text={text} author={author} date={date} id={id}/>
                    ))}
                </ul>
            </div>
            <b id="message">{message}</b>
        </div>
    )
};

Main.propTypes = {
    message: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.shape({
        ...Followers.propTypes
    }).isRequired).isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired,
    addFollow: PropTypes.func.isRequired,
    filterArticles: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ message: state.message, followers: state.followers, articles: state.articles }),
    (dispatch) => ({
        addFollow: (newFollow, follows) => dispatch(addFollow(newFollow, follows)),
        filterArticles: (keyword) => dispatch(filterArticles(keyword)),
    })
)(Main)