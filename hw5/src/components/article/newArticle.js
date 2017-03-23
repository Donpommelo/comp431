import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { newArticle } from './articleActions'
import Articles from './article'

export const NewArticle = ({ articles, postArticle }) => {

    let newPost;

    const _postArticle = () => {
        if (newPost) {
            postArticle(newPost.value);
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
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired,
    postArticle: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({ articles: state.articles }),
    (dispatch) => ({ postArticle: (text) => newArticle(text)(dispatch)})
)(NewArticle)