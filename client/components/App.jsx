import React, { useState, useEffect } from 'react';
import Upload from './Upload.jsx';
import Browse from './Browse.jsx';
import Video from './Video.jsx';

const App = () => {

  const [view, updateView] = useState('browse');
  const [video, updateVideo] = useState(null);

  const changeView = (newView, videoName = null) => {
    updateView(newView);
    updateVideo(videoName);
  }

  const renderView = () => {
    if (view === 'video') {
      return <Video video={video} />;
    } else if (view === 'browse') {
      return (
      <ul>< Browse changeView={changeView} /></ul>
      );
    } else if (view === 'upload') {
      return < Upload />;
    }
  }

  return (
    <div>
      <div id='header'>
        <span className='site-title'>Vidly</span>
        <span className='nav' onClick={() => {changeView('browse')}}>Browse</span>
        <span className='nav' onClick={() => {changeView('upload')}}>Upload</span>
      </div>
      {renderView()}
    </div>
  );
};

export default App;