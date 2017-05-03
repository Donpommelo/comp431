import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { commentEditBegin } from './articleActions'
import { commentEditEnd } from './articleActions'
import { editComment } from './articleActions'

export const Comments = ({ commenting, text, author, date, _id, artId, editBegin, editEnd, edit }) => {

    let newComment;

    const _editComment = () => {
        if (newComment) {
            edit(artId, _id, newComment.value)
            newComment.value = ''
        }
    }

    const _commentBegin = () => {
        editBegin(_id)
    }

    const _commentEnd = () => {
        editEnd(_id)
    }

    return (<div className="comment">
        <p>{text}</p>
        <p>{author}</p>
        <p>{date}</p>
        {
            commenting.indexOf(_id) < 0 ? <button onClick={_commentBegin}>Edit</button> 
            : <button onClick={_commentEnd}>Cancel Edit</button>
        }
        <br/>
        {
            commenting.indexOf(_id) < 0 ? <br/> 
            : <input type="text" placeholder="Your new comment here" ref={(node) => newComment = node} />
        }
        {
            commenting.indexOf(_id) < 0 ? <br/> 
            : <p><button onClick={_editComment}>Edit Comment</button></p>

        }
        <br/>
    </div>)
};

Comments.propTypes = {
    commenting: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    editBegin : PropTypes.func.isRequired,
    editEnd : PropTypes.func.isRequired,
    edit : PropTypes.func.isRequired
};

export default connect(
    (state) => ({ commenting: state.commentsEditing}),
    (dispatch) => ({
        edit: (artId, id, text) => editComment(artId, id, text)(dispatch),
        editBegin: (id) => commentEditBegin(id)(dispatch),
        editEnd: (id) => commentEditEnd(id)(dispatch)
    })
)(Comments)