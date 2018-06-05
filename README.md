# PoseNet and TensorFlow.js

This is an example of the power of using pre-trained models in the browser. PoseNet can detect human figures in images and videos using either a single-pose or multi-pose algorithm. For more details about this Machine Learning model, [refer to this blog post](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) for a high-level description of PoseNet running on Tensorflow.js.

This code is based on [tfjs-models/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) TensorFlow team . I borrowed, adapted and turned it into a React component.

## PoseNet React Component
```jsx
import * as React from 'react'
import ReactDOM from 'react-dom'
import PoseNet from './PoseNet'

ReactDOM.render(
  <PoseNet
    {/* Default value: 600 */}
    videoWidth={ 600 }
    
    {/* Default value: 500 */}
    videoHeight={ 500 }
    
    {/*
      If the poses should be flipped/mirrored horizontally. 
      This should be set to true for videos where the video 
      is by default flipped horizontally (i.e. a webcam), and 
      you want the poses to be returned in the proper orientation.
      Default value: false
    */}
    flipHorizontal={ false }
    
    {/*
      There are two possible values: 'single-pose' | 'multi-pose'.
      Default value: 'single-pose'
    */}
    algorithm={ 'single-pose' }
    
    {/* Default value: true */}
    showVideo={ true }
    
    {/* Default value: true */}
    showSkeleton={ true }
    
    {/* Default value: true */}
    showPoints={ true }
    
    {/*
      The overall confidence in the estimation of a person's
      pose (i.e. a person detected in a frame)
      Default value: 0.1
    */}
    minPoseConfidence={ 0.1 }
    
    {/*
      The confidence that a particular estimated keypoint
      position is accurate (i.e. the elbow's position)
      Default value: 0.5
    */}
    minPartConfidence={ 0.5 }
    
    {/* 
      The maximum number of poses to detect.
      Default value: 2
    */}
    maxPoseDetections={ 2 }
    
    {/*
      Non-maximum suppression part distance. It needs to be strictly positive. 
      Two parts suppress each other if they are less than nmsRadius pixels away. 
      Defaults value: 20
    */}
    nmsRadius={ 20.0 }
    
    {/*
      Must be 32, 16, or 8. This parameter affects the height and width 
      of the layers in the neural network. At a high level, it affects 
      the accuracy and speed of the pose estimation. The lower the value 
      of the output stride the higher the accuracy but slower the speed, 
      the higher the value the faster the speed but lower the accuracy
    */}
    outputStride={ 16 }
    
    {/*
      Values between 0.2 and 1. Scales down the image and increase 
      the speed when feeding through the network at the cost of accuracy.
      Default value: 0.5
    */}
    imageScaleFactor={ 0.5 }
    
    {/* Default value: 'aqua' */}
    skeletonColor={ 'aqua' }
    
    {/* Default value: 2 */}
    skeletonLineWidth={ 2 }
  />,
  
  document.getElementById('app')
)
```
## Installing and running example
```
$> npm install
$> npm run example
```

Browser will open http://localhost:8080/. Have fun :wink:

## How to consume the component
```
$> npm install jscriptcoder/tfjs-posenet
```

```jsx
import * as React from 'react'
import PoseNet from 'path/to/PoseNet'

const MyContainer = (props) => (
  <div>
    <h3>This is a my container<h3>
    <PoseNet 
      videoWidth={props.width} 
      videoHeight={props.height} 
      skeletonColor={props.color}
    />
  </div>
)
```
