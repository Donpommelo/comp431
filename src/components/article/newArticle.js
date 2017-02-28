import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { newPost } from '../main/followingActions'
import Articles from './article'

export const NewArticle = ({ currentAccount, accountBank, articles, postArticle }) => {

    let newPost;

    const _getAuthor = () => {
        const accounts = accountBank.filter((account) => account.id == currentAccount);
        if (accounts && accounts.length > 0) {
            return accounts[0].name;
        }
    };

    const _postArticle = () => {
        if (newPost) {
            postArticle(newPost.value, _getAuthor(), articles.length);
            newPost.value='';
        }
    };

    const _clearArticle = () => {
        if (newPost) {
            newPost.value='';
        }
    };

    return (<div id="newArticle">

        <br/>
        <input type="file" placeholder="Add Image"/>
        <input type="text" placeholder="Your post here" ref={(node) => newPost = node} />
        <button onClick={_postArticle}>Post</button>
        <button onClick={_clearArticle}>Cancel</button>
    </div>)
};

NewArticle.propTypes = {
    currentAccount: PropTypes.number.isRequired,
    accountBank: PropTypes.array.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired,
    postArticle: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ currentAccount: state.currentAccount, accountBank: state.accountBank, articles: state.articles }),
    (dispatch) => ({ postArticle: (text, author, id) => dispatch(newPost(text, author, id))})
)(NewArticle)