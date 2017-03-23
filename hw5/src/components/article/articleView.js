import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Articles from './article'
import NewArticle from './newArticle'

export const ArticleView = ({ articles }) => {

    return (<div>
                <NewArticle/>
                <ul >
                    {articles.map(({img, text, author, date, comments, _id}) => (
                        <Articles key={_id} img={img} text={text} author={author} date={date} comments={comments} _id={_id}/>
                    ))}
                </ul>
            </div>)
};

ArticleView.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Articles.propTypes
    }).isRequired).isRequired
};

export default connect(null , null)(ArticleView)