import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import commentsService from './../services/comments-service'

class CommentsList extends Component {

  componentDidMount() {
    const { id } = this.props.exerciseId;
    console.log(id);
    
    commentsService.getAll(id)
      .then( allComments => {
        console.log(allComments.comments)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default CommentsList;