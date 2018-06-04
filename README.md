# PoseNet and TensorFlow.js

This is an example of the power of using pre-trained models in the browser. PoseNet can detect human figures in images and videos using either a single-pose or multi-pose algorithm. For more details about this Machine Learning model, [refer to this blog post](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) for a high-level description of PoseNet running on Tensorflow.js.

This code is based on [tfjs-models/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) TensorFlow team. I borrowed, adapted and turned it into a React component.

## PoseNet React Component
```jsx
import * as React from 'react'
import ReactDOM from 'react-dom'
import PoseNet from './PoseNet'

ReactDOM.render(
  <PoseNet
    videoWidth={ 600 }
    videoHeight={ 500 }
    flipHorizontal={ false }
    
    {/* There are two possible values: 'single-pose' | 'multi-pose' */}
    algorithm={ 'single-pose' }
    
    showVideo={ true }
    showSkeleton={ true }
    showPoints={ true }
    
    {/* */}
    minPoseConfidence={ 0.1 }
    
    {/* */}
    minPartConfidence={ 0.5 }
    
    {/* */}
    maxPoseDetections={ 2 }
    
    {/* */}
    nmsRadius={ 20.0 }
    
    {/* */}
    outputStride={ 16 }
    
    {/* */}
    imageScaleFactor={ 0.5 }
    
    {/* */}
    skeletonColor={ 'aqua' }
    
    {/* */}
    skeletonLineWidth={ 2 }
  />,
  
  document.getElementById('app')
)
```
