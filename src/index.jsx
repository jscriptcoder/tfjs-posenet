import 'babel-polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import PoseNet from './PoseNet'

const TV = (props) => (
  <div className="tv">
    <div className="tv-inner">
      { props.children }
    </div>
  </div>
)

ReactDOM.render(
  <TV>
    <PoseNet />
  </TV>,
  document.getElementById('example')
)
