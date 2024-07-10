import React from 'react';

const BlogCard = ({ item, style }) => {
  return (
    <a
    target='_blank'
      href={item.link}
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      style={style}
    >
      <div className="h-25 bg-gray-200 flex items-center justify-center rounded-md mb-4">
        <img
          src={item.image_url}
          alt={item.title}
          className="h-full w-full lg:h-full lg:w-full object-cover rounded-md"
        />
      </div>
      <h2 className="text-sm font-bold">{item.title}</h2>
    </a>
  );
};

export default BlogCard;
