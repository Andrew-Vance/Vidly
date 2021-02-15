import React, { useState } from 'react';

const VideoEntry = ({ video, changeView }) => {

  return (
    <div onClick={()=>{changeView('video', video.name)}}>
      {video.name.slice(0, -4)}
    </div>
  );
};

export default VideoEntry;