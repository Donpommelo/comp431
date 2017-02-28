import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const Articles = ({ pic, text, author, date, id }) => {

    return (<div id="article">
        <img src={pic}/>
        <p>{text}</p>
        <p>{author}</p>
        <p>{date}</p>
        <p><button>Edit</button>
        <button>Comment</button></p>
        <br/>
    </div>)
};

Articles.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    pic: PropTypes.string.isRequired,
};

export default connect(null, null)(Articles)