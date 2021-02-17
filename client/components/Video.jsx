import React from 'react';

const Video = ({ video }) => {
  return (
    <div id='videoView'>
      <video id='videoPlayer' controls>
        <source src={video.videoUrl} type='video/mp4' />
      </video>
    </div>
  )
};

export default Video;