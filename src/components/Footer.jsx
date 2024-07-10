import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} Furni Finder By SATSET Team</p>
    </footer>
  );
};

export default Footer;