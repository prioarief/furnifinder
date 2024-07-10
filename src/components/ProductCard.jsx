import React from 'react';
import moneyFormat from '../utils/moneyFormat';
import Rating from './Rating';

const ProductCard = ({ item, onClick, style }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}
      style={style}
    >
      <div className="h-25 bg-gray-200 flex items-center justify-center rounded-md mb-4">
        <img
          src={item.image_url}
          alt={item.name}
          className="h-full w-full lg:h-full lg:w-full object-cover rounded-md"
        />
      </div>
      <h2 className="text-sm font-bold">{item.name}</h2>
      <span className="my-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        {item.category_name}
      </span>
      <Rating rating={item.rating} />
      <p className="text-xs font-semibold mt-2">{moneyFormat(item.price)}</p>
    </div>
  );
};

export default ProductCard;
