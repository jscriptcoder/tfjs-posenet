import * as posenet from '@tensorflow-models/posenet'
import * as React from 'react'
import { isMobile } from './utils'

export default class PoseNetExample extends React.Component {

  static defaultProps = {
    videoWidth: 600,
    videoHeight: 500,
  }

  constructor(props) {
    super(props, PoseNetExample.defaultProps)
  }

  async componentWillMount() {
    // Loads the pre-trained PoseNet model
    this.model = await posenet.load();
  }

  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch(e) {
      // console.log(e)
    }
  }

  async setupCamera() {

      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }

    const video = this.video = document.querySelector('video')
    video.width = this.props.videoWidth
    video.height = this.props.videoHeight

    const mobile = isMobile()

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? undefined : this.props.videoWidth,
        height: mobile ? undefined: this.props.videoHeight,
      }
    });

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video is ready, we start showing video
        video.play()
        resolve()
      }
    })
  }
  // 
  // function detectPose(video, net) {
  //   const canvas = this.canvas = document.querySelector('canvas')
  //   const ctx = canvas.getContext('2d')
  //   const flipHorizontal = true // since images are being fed from a webcam
  //
  //   canvas.width = this.props.videoWidth
  //   canvas.height = this.props.videoHeight
  //
  //   async function poseDetectionFrame() {
  //     if (guiState.changeToArchitecture) {
  //       // Important to purge variables and free up GPU memory
  //       guiState.net.dispose();
  //
  //       // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01 version
  //       guiState.net = await posenet.load(Number(guiState.changeToArchitecture));
  //
  //       guiState.changeToArchitecture = null;
  //     }
  //
  //     // Begin monitoring code for frames per second
  //     stats.begin();
  //
  //     // Scale an image down to a certain factor. Too large of an image will slow down
  //     // the GPU
  //     const imageScaleFactor = guiState.input.imageScaleFactor;
  //     const outputStride = Number(guiState.input.outputStride);
  //
  //     let poses = [];
  //     let minPoseConfidence;
  //     let minPartConfidence;
  //     switch (guiState.algorithm) {
  //       case 'single-pose':
  //         const pose = await guiState.net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
  //         poses.push(pose);
  //
  //         minPoseConfidence = Number(
  //           guiState.singlePoseDetection.minPoseConfidence);
  //         minPartConfidence = Number(
  //           guiState.singlePoseDetection.minPartConfidence);
  //         break;
  //       case 'multi-pose':
  //         poses = await guiState.net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride,
  //           guiState.multiPoseDetection.maxPoseDetections,
  //           guiState.multiPoseDetection.minPartConfidence,
  //           guiState.multiPoseDetection.nmsRadius);
  //
  //         minPoseConfidence = Number(guiState.multiPoseDetection.minPoseConfidence);
  //         minPartConfidence = Number(guiState.multiPoseDetection.minPartConfidence);
  //         break;
  //     }
  //
  //     ctx.clearRect(0, 0, videoWidth, videoHeight);
  //
  //     if (guiState.output.showVideo) {
  //       ctx.save();
  //       ctx.scale(-1, 1);
  //       ctx.translate(-videoWidth, 0);
  //       ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  //       ctx.restore();
  //     }
  //
  //     // For each pose (i.e. person) detected in an image, loop through the poses
  //     // and draw the resulting skeleton and keypoints if over certain confidence
  //     // scores
  //     poses.forEach(({ score, keypoints }) => {
  //       if (score >= minPoseConfidence) {
  //         if (guiState.output.showPoints) {
  //           drawKeypoints(keypoints, minPartConfidence, ctx);
  //         }
  //         if (guiState.output.showSkeleton) {
  //           drawSkeleton(keypoints, minPartConfidence, ctx);
  //         }
  //       }
  //     });
  //
  //     // End monitoring code for frames per second
  //     stats.end();
  //
  //     requestAnimationFrame(poseDetectionFrame);
  //   }
  //
  //   poseDetectionFrame();
  // }

  render() {
    return (
      <div className="posenet-example">
        <div className="loading"></div>
        <video></video>
        <canvas></canvas>
      </div>
    )
  }
}
