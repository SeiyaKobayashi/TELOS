import React from 'react'
import PostsList from './PostsList'
import $ from 'jquery'

export default class PostsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  loadPosts() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
        // console.log(this.state.data);
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }
  componentDidMount() {
    this.loadPosts();
    setInterval(this.loadPosts.bind(this), this.props.pollInterval);
  }
  render() {
    return(
      <div className='postsBox'>
        <h2>Test Posts</h2>
        <PostsList data={this.state.data}/>
      </div>
    );
  }
}
