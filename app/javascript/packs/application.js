import React from 'react'
import ReactDOM from 'react-dom'
import PostsBox from './PostsBox'

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)

// var data = [
//   {user: 'Seiya1', content: 'This is comment1'},
//   {user: 'Seiya2', content: 'This is comment2'},
//   {user: 'Seiya3', content: 'This is comment3'}
// ];

// ReactDOM.render(
//   <PostsBox url="/posts/index" pollInterval={3000000} />,
//   document.getElementById('root'),
// );
