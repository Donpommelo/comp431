import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { newArticle, newArticleWithImage } from './articleActions'
import Articles from './article'

export const NewArticle = ({ articles, postArticle, postArticleWithImage }) => {

    let newPost, postImg;

    const _postArticle = () => {
        if (newPost) {
            if (postImg) {
                postArticleWithImage(newPost.value, postImg)
            } else {
                postArticle(newPost.value);
            }
            newPost.value='';
            postImg='';
        }
    };

    const _clearArticle = () => {
        if (newPost) {
            newPost.value='';
        }
    };

    const _addImg = (img) => {
        postImg = img.target.files[0]
    };

    return (<div id="newArticle">

        <br/>
        <input id="postImg" type="file" placeholder="Add Image" accept="image/*" onChange={(e) => _addImg(e)} />
        <input type="text" id="newArticleText" placeholder="Your post here" ref={(node) => newPost = node} />
        <button id="postArticle" onClick={_postArticle}>Post</button>
        <button onClick={_clearArticle}>Cancel</button>
    </div>)
};

NewArticle.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired,
    postArticle: PropTypes.func.isRequired,
    postArticleWithImage: PropTypes.func.isRequired
};

export default connect(
    (state) => ({ articles: state.articles }),
    (dispatch) => ({ 
        postArticle: (text) => newArticle(text)(dispatch),
        postArticleWithImage: (text, img) => newArticleWithImage(text, img)(dispatch)
    })
)(NewArticle)