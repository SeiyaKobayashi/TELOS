// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
// import Post from './Post'
//
// export default class PostsList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user_id: this.props.user_id,
//       post_id: this.props.post_id,
//       like_id: this.props.like_id,
//       num_of_likes: this.props.num_of_likes
//     };
//   }
//   // loadPosts() {
//   //   $.ajax({
//   //     url: this.props.url,
//   //     dataType: 'json',
//   //     cache: false,
//   //     success: (data) => {
//   //       this.setState({data: data});
//   //       // console.log(this.state.data);
//   //     },
//   //     error: (xhr, status, err) => {
//   //       console.error(this.props.url, status, err.toString());
//   //     }
//   //   });
//   // }
//   // componentDidMount() {
//   //   this.loadPosts();
//   //   setInterval(this.loadPosts.bind(this), this.props.pollInterval);
//   // }
//   render() {
//     var posts = this.props.data.map((post) => {
//       return(<Post user={post.user}>{post.content}</Post>);
//     });
//     return(<div className='postList'>{posts}</div>);
//     return(
//       <div className='posts-index-item'>
//         <Post data = {
//           this.state.user_id,
//           this.state.post_id,
//           this.state.like_id,
//           this.state.num_of_likes
//         }/>
//       </div>
//     );
//   }
// }
//
// // These props(parameters) are passed from 'index.html.erb'
// PostsList.propTypes = {
//   user_id: PropTypes.number,
//   post_id: PropTypes.number,
//   like_id: PropTypes.number,
//   num_of_likes: PropTypes.number
// };
