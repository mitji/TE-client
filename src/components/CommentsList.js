import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import commentsService from './../services/comments-service'

class CommentsList extends Component {

  state = {
    comments: []
  }
  componentDidMount() {
    const { id } = this.props.exerciseId;
    console.log(id);
    
    commentsService.getAll(id)
      .then( comments => {
        console.log(comments)
        this.setState({comments})
      })
      .catch(err => console.log(err));
  }

  render() {
    const comments = this.state.comments;
    return (
      <div>
        {
          comments
          ? 
          <div>
            {
              comments.map(comment => {
                return (
                  <div>
                    <p>{comment.text}</p>
                    <strong>{comment.author.name} {comment.author.lastName}</strong>
                  </div>
                )
              })
            }
          </div>
          : <p>No comments</p>
        }
      </div>
    )
  }
}

export default CommentsList;