import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Comments from './comment'

export const Articles = ({ img, text, author, date, comments, _id }) => {

    const commentToggle = () => {
        let comments = document.getElementsByClassName('comment');
            if (comments[0].style.display === 'none') {
                for (var i = 0; i < comments.length; i++) {
                    comments[i].style.display = 'inline';
                }
            } else {
                for (var i = 0; i < comments.length; i++) {
                    comments[i].style.display = 'none';
                }
            }
              
    }

    return (<div id="article">
        <img src={img}/>
        <p>{text}</p>
        <p>{author}</p>
        <p>{date}</p>
        <p><button>Edit</button>
        <button>Comment</button>
        <button onClick={commentToggle}>Hide/Unhide Comments</button></p>
        <ul >
            {comments.map(({text, author, date, commentId}) => 
            (<Comments key={commentId} text={text} author={author} date={date} _id={commentId}/>
            ))}       
        </ul>
        <br/>
    </div>)
};

Articles.propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
};

export default connect(null, null)(Articles)