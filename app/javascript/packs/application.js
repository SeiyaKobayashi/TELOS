import React from 'react'
import ReactDOM from 'react-dom'

// Setups
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)
