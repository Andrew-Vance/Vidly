import React from 'react';

const Video = ({ name }) => {
  return (
    <div id='videoView'>
      <video id='videoPlayer' controls>
        <source src={`http://localhost:3000/video/${name}`} type='video/mp4' />
      </video>
    </div>
  )
};

export default Video;