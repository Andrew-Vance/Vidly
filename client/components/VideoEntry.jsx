import React, { useState } from 'react';

const VideoEntry = ({ video }) => {

  return (
    <div>
      <img className='thumbnail' src={`http://localhost:3000/thumbnail/${video.name}`}></img>
      <span className='title'>{video.name.slice(0, -4)}</span><br></br><br></br>
      <span className='description'>{video.description}</span>
    </div>
  );
};

export default VideoEntry;