import React from 'react';
import loadingGif from '../assets/load.gif';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <img src={loadingGif} alt="Loading..." className="w-1/5" />
    </div>
  );
};

export default LoadingScreen;
