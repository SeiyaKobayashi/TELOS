import React from 'react'
// import Like from './Like'

export default class Post extends React.Component {
  render() {
    return(
      <div className='post_'>
        <h3 className='post_user'>
          {this.props.user}
        </h3>
        {this.props.children}
        // <Like />
      </div>
    );
  }
}
