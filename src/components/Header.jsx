import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({
  children,
  title = 'Temukan Furnitur Terbaik Untuk Rumahmu!',
  subtitle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate()

  const backgroundImages = [
    'https://plus.unsplash.com/premium_photo-1673548917423-073963e7afc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1673203734665-0a534c043b7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1633119712778-30d94755de54?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % backgroundImages.length
        );
        setIsFading(false);
      }, 1500); // Duration of fade-out
    }, 7000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className={`relative bg-cover bg-center h-screen transition-all duration-1000 ${
          isFading ? 'fade-in' : ''
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center lg:mb-44 mb-28">
          <div className="text-2xl font-bold text-white">FurniFinder</div>
          <button onClick={toggleMenu} className="block lg:hidden">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <nav
            className={`absolute top-16 right-4 bg-white shadow-md rounded-md ${
              isMenuOpen ? 'block' : 'hidden'
            } lg:block lg:relative lg:top-0 lg:right-0 lg:bg-transparent lg:shadow-none lg:rounded-none`}
          >
            <ul className="flex flex-col lg:flex-row">
              <li className="p-2 px-5 lg:p-0 lg:ml-4">
                <button
                  onClick={() => navigate('/')}
                  className="text-black lg:text-white"
                >
                  Home
                </button>
              </li>
              <li className="p-2 px-5 lg:p-0 lg:ml-4">
                <button
                  onClick={() => navigate('/blog')}
                  className="text-black lg:text-white"
                >
                  Blog
                </button>
              </li>
              <li className="p-2 px-5 lg:p-0 lg:ml-4">
                <button
                  onClick={() => alert('coming soon')}
                  className="text-black lg:text-white"
                >
                  Promo
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="">
          <div className="relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            {subtitle && <h2 className="text-md lg:text-2xl text-white font-bold p-6 lg:mx-44">
            {subtitle}
          </h2>}
          </div>
          {children}
        </div>
      </header>
    </div>
  );
};

export default Header;
