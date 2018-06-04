import * as posenet from '@tensorflow-models/posenet'
import * as React from 'react'
import { isMobile, drawKeypoints, drawSkeleton } from './utils'

export default class PoseNetExample extends React.Component {

  static defaultProps = {
    videoWidth: 600,
    videoHeight: 500,
    flipHorizontal: true,
    architecture: 'single-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: 'aqua',
  }

  constructor(props) {
    super(props, PoseNetExample.defaultProps)
  }

  async componentWillMount() {
    // Loads the pre-trained PoseNet model
    this.net = await posenet.load();
  }

  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch(e) {
      // console.log(e)
    }

    this.detectPose()
  }

  async setupCamera() {
    const { videoWidth, videoHeight } = this.props

      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }

    const video = this.video = document.querySelector('video')

    video.width = videoWidth
    video.height = videoHeight

    const mobile = isMobile()

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? void 0 : videoWidth,
        height: mobile ? void 0: videoHeight,
      }
    });

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video metadata is ready, we can start streaming video
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props
    const canvas = this.canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    poseDetectionFrame(ctx);
  }

  async poseDetectionFrame(ctx) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      maxPoseDetections,
      minPartConfidence,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
    } = props

    let poses = []

    switch (this.props.algorithm) {
      case 'single-pose':

        const pose = await this.model.estimateSinglePose(
          this.video,
          imageScaleFactor,
          flipHorizontal,
          outputStride
        )

        poses.push(pose)

        break
      case 'multi-pose':

        poses = await this.model.estimateMultiplePoses(
          this.video,
          imageScaleFactor,
          flipHorizontal,
          outputStride,
          maxPoseDetections,
          minPartConfidence,
          nmsRadius
        )

        break
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    if (showVideo) {
      ctx.save()
      ctx.scale(-1, 1)
      ctx.translate(-videoWidth, 0)
      ctx.drawImage(this.video, 0, 0, videoWidth, videoHeight)
      ctx.restore()
    }

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        if (showPoints) {
          drawKeypoints(keypoints, minPartConfidence, skeletonColor, ctx);
        }
        if (showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, skeletonColor, ctx);
        }
      }
    })

    requestAnimationFrame(poseDetectionFrame);
  }

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
