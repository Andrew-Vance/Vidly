import React, { useState } from 'react';

const VideoEntry = ({ video }) => {

  return (
    <div>
      <img className='thumbnail' src={`${video.thumbURL}`} ></img>
      <span className='title'>{video.name.slice(0, -4)}</span><br></br><br></br>
      <span className='description'>{video.description}</span>
    </div>
  );
};

export default VideoEntry;