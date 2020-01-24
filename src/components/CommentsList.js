import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import commentsService from './../services/comments-service'
import './../styles/comments.scss';

class CommentsList extends Component {

  state = {
    comments: [],
    userComment: ''
  }

  parseDate = (date) => {
    const dateToParse= date.slice(0,date.indexOf('T'));
    const dateStr = dateToParse.split('-');
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'long' });
    const year = d.getFullYear();
    return {day, month, year};
  }

  handleComment = (e) => {
    const { value } = e.target;
    this.setState({userComment: value})
  }

  deleteComment = (e,commentId) => {
    //e.preventDefault();
    const { id } = this.props.exerciseId;
    commentsService.deleteOne(id,commentId)
      .then( (comments) => {
        
        this.setState({comments})
      })
      .catch( (err) => console.log(err));

  }

  submitComment = (e) => {
    e.preventDefault();
    const { id } = this.props.exerciseId;
    const text = this.state.userComment;
    
    commentsService.create(id, {text})
      .then( (comments) => {
        this.setState({comments});
        this.setState({userComment: ''})
      })
      .catch( (err) => console.log(err));   
  }

  componentDidMount() {
    const { id } = this.props.exerciseId;
    
    commentsService.getAll(id)
      .then( comments => {
        this.setState({comments})
      })
      .catch(err => console.log(err));
  }

  render() {
    const comments = this.state.comments;
    return (
      <div>
        <h4>Comments</h4>
        {
          comments
          ? 
          <div>
            {
              comments.map(comment => {
                const { day, month, year } = this.parseDate(comment.created_at);
                return (
                  <div className="comment">
                    <strong className="comment__author">{comment.author.name} {comment.author.lastName}</strong>
                    <p className="comment__date">{month} {day}, {year}</p>
                    <p className="comment__text">{comment.text}</p>
                    {
                      comment.author._id === this.props.currentUser
                      ? <button onClick={(e) => this.deleteComment(e,comment._id)} className="delete-btn">Delete</button>
                      : null
                    }
                  </div>
                )
              })
            }
          </div>
          : <p>No comments</p>
        }
        <form onSubmit={this.submitComment} className="add-comment-form">
          <textarea type="text" name="text" placeholder="Write your comment here" 
                    onChange={this.handleComment} value={this.state.userComment}>
          </textarea>
          <button type="submit" className="btn btn-post">Post</button>
        </form>
      </div>
    )
  }
}

export default CommentsList;