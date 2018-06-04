import 'babel-polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import PoseNet from './PoseNet'

ReactDOM.render(
  <PoseNet />,
  document.getElementById('example')
)
