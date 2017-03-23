import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Comments = ({ text, author, date, _id }) => {

    return (<div className="comment">
        <p>{text}</p>
        <p>{author}</p>
        <p>{date}</p>
        <p><button>Edit</button>
        <button>Comment</button></p>       
        <br/>
    </div>)
};

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
};

export default connect(null, null)(Comments)