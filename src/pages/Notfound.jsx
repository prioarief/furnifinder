import React from 'react';
import loadingGif from '../assets/404.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75">
      <img src={loadingGif} alt="Loading..." className="w-1/3" />
      <button
        onClick={() => navigate('/')}
        className="mt-50 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Kembali ke Home
      </button>
    </div>
  );
};

export default NotFound;
