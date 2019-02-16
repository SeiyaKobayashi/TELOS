import React from 'react'
import Post from './Post'

export default class PostList extends React.Component {
  render() {
    var postNodes = this.props.data.map((post) => {
      return(<Post user={post.user}>{post.content}</Post>);
    });
    return(<div className='postList'>{postNodes}</div>);
  }
}
