import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Comments from './comment'
import { toggleCommentsOn } from './articleActions'
import { toggleCommentsOff } from './articleActions'
import { articleEditBegin } from './articleActions'
import { articleEditEnd } from './articleActions'
import { articleCommentBegin } from './articleActions'
import { articleCommentEnd } from './articleActions'
import { editArticle } from './articleActions'
import { commentArticle } from './articleActions'

export const Articles = ({ editing, commenting, img, text, author, date, comments, _id, 
    toggleOn, toggleOff, editBegin, editEnd, editSubmit, commentBegin, commentEnd, commentSubmit }) => {

    const _commentToggle = () => {
        if (comments) {
            if (comments.length != 0) {
                toggleOff(_id)
            } else {
                toggleOn(_id)
            }
        }
    }

    const _beginEdit = () => {
        editBegin(_id)
    }

    const _endEdit = () => {
        editEnd(_id)
    }

    const _edit = () => {
        if (newEdit) {
            editSubmit(_id, newEdit.value)
            newEdit.value = ''
        }
    }

    const _beginComment = () => {
        commentBegin(_id)
    }

    const _endComment = () => {
        commentEnd(_id)
    }

    const _comment = () => {
        if (newComment) {
            commentSubmit(_id, newComment.value)
            newComment.value = ''
        }
    }

    let newComment, newEdit;

    return (<div id="article" className="singleArticle">
        <img src={img}/>
        <p id="articleText">{text}</p>
        <p id="articleAuthor">{author}</p>
        <p>{date}</p>
        
        <p>
            {
                editing.indexOf(_id) < 0 ? <button id="editBegin" onClick={_beginEdit}>Edit</button> 
                : <button onClick={_endEdit}>Cancel Edit</button>
            }
            {
                commenting.indexOf(_id) < 0 ? <button onClick={_beginComment}>Comment</button> 
                : <button onClick={_endComment}>Cancel Comment</button>
            }
            <button onClick={_commentToggle}>Hide/Unhide Comments</button>
            <br/>
            {
                editing.indexOf(_id) < 0 ? <br/> 
                : <input type="text" id="articleEdits" placeholder="Your edited article here" ref={(node) => newEdit = node} />
            }
            {
                editing.indexOf(_id) < 0 ? <br/> 
                : <button id="editArticle" onClick={_edit}>Edit Post</button>
            }
            <br/>
            {
                commenting.indexOf(_id) < 0 ? <br/> 
                : <input type="text" placeholder="Your comment here" ref={(node) => newComment = node} />
            }
            {
                commenting.indexOf(_id) < 0 ? <br/> 
                : <button onClick={_comment}>Comment Post</button>
            }
            <br/>
        </p>
        <ul >
            {comments.map(({text, author, date, commentId}) => 
                <Comments key={commentId} text={text} author={author} date={date} _id={commentId} artId={_id}/>
            )}       
        </ul>
        <br/>
    </div>)
};

Articles.propTypes = {
    editing: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    commenting: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    toggleOn : PropTypes.func.isRequired,
    toggleOff : PropTypes.func.isRequired,
    editBegin : PropTypes.func.isRequired,
    editEnd : PropTypes.func.isRequired,
    commentBegin : PropTypes.func.isRequired,
    commentEnd : PropTypes.func.isRequired,
    editSubmit : PropTypes.func.isRequired,
    commentSubmit : PropTypes.func.isRequired
};

export default connect(
    (state) => ({ editing: state.articlesEditing, commenting: state.articlesCommenting }),
    (dispatch) => ({
        toggleOn: (id) => toggleCommentsOn(id)(dispatch),
        toggleOff: (id) => toggleCommentsOff(id)(dispatch),
        editBegin: (id) => articleEditBegin(id)(dispatch),
        editEnd: (id) => articleEditEnd(id)(dispatch),
        commentBegin: (id) => articleCommentBegin(id)(dispatch),
        commentEnd: (id) => articleCommentEnd(id)(dispatch),
        editSubmit: (id, text) => editArticle(id, text)(dispatch),
        commentSubmit: (id, text) => commentArticle(id, text)(dispatch),

    })
)(Articles)