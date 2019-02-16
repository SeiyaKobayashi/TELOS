import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery'

export default class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      like_id: this.props.like_id,
      num_of_likes: this.props.num_of_likes
    };
  }
  handleUnlikeClick(e, post_id, like_id) {
    e.preventDefault();
    $.ajax({
      url: '/likes/delete',
      dataType: 'json',
      type: 'POST',
      data: {post_id: post_id, like_id: like_id},
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: (like) => {
        this.setState({like_id: 0, num_of_likes: this.state.num_of_likes - 1}); },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }
  handleLikeClick(e, post_id, like_id) {
    e.preventDefault();
    $.ajax({
      url: '/likes/create',
      dataType: 'json',
      type: 'POST',
      data: {post_id: post_id, like_id: like_id},
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: (like) => {
          console.log(this.num_of_likes);
          console.log(this.num_of_likes - 1);
        this.setState({like_id: like.id, num_of_likes: this.state.num_of_likes + 1}); },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }
  showLike(like_id) {
    if (like_id != 0) {
      return <i className='fas fa-thumbs-up liked' onClick={e => this.handleUnlikeClick(e, this.state.post_id, this.state.like_id)}></i>;
    } else {
      return <i className='fas fa-thumbs-up not-liked' onClick={e => this.handleLikeClick(e, this.state.post_id, this.state.like_id)}></i>;
    }
  }
  showNumOfLikes(num_of_likes) {
    if (num_of_likes != 0) {
      if (this.state.like_id != 0) {
        return <div className='num-of-likes-liked'>{this.state.num_of_likes}</div>;
      } else {
        return <div className='num-of-likes-not-liked'>{this.state.num_of_likes}</div>;
      }
    } else {
      return (null);
    }
  }
  render() {
    return(
      <div>
        {this.showLike(this.state.like_id)}
        {this.showNumOfLikes(this.state.num_of_likes)}
      </div>
    );
  }
}

// These props(parameters) are passed from 'index.html.erb'
Like.propTypes = {
  user_id: PropTypes.number,
  post_id: PropTypes.number,
  like_id: PropTypes.number,
  num_of_likes: PropTypes.number
};
