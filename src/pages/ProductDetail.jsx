import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getProductDetail } from '../utils/api';
import moneyFormat from '../utils/moneyFormat';
import Rating from '../components/Rating';

const sliderSetting = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: 'linear',
};

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state?.id) return navigate('/');
    getProductDetail(state.id, loading, setLoading, setProduct);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-2 lg:p-3">
      <div className="bg-white shadow-md rounded-lg max-w-full mx-auto p-6">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 slider-container">
            {loading ? (
              <Skeleton height={300} />
            ) : product?.media_gallery?.length > 0 ? (
              <Slider {...sliderSetting}>
                {product?.media_gallery?.map((mg, mgi) => (
                  <div key={mgi}>
                    <img
                      className="w-full h-1/2 object-cover rounded-lg"
                      src={mg}
                      alt="Product"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                className="w-full h-full rounded-lg"
                src={product?.image_url}
                alt="Product"
              />
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:ml-6 mt-6 lg:mt-0">
            {loading ? (
              <>
                <Skeleton height={30} width={200} />
                <Skeleton height={20} width={100} className="mt-2" />
                <Skeleton height={20} width={60} className="mt-2" />
                <Skeleton height={20} width={120} className="mt-2" />
                <Skeleton height={100} className="mt-4" />
                <Skeleton height={40} width={100} className="mt-4" />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{product?.name}</h1>
                <span className="my-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {product?.category_name}
                </span>
                <Rating rating={product?.rating} />
                <p className="text-2xl font-semibold mt-2">
                  {moneyFormat(product?.price)}
                </p>
                <p className="text-green-500">
                  {product?.stock_status.split('_').join(' ')}
                </p>
                <h2 className="mt-4 text-lg font-bold">Description</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.description || '-',
                  }}
                  className="mt-2 mb-5 text-gray-700"
                />

                <a
                  href={product?.url}
                  target='_blank'
                  // onClick={() => (window.location.href = product.url)}
                  className="mt-50 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Buy Now
                </a>
              </>
            )}
          </div>
        </div>

        {/* YouTube Video Section */}
        {product?.video_url && (
          <div className="mt-12">
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <>
                <h2 className="text-2xl font-bold">Product Video</h2>
                <div className="mt-4">
                  <iframe
                    className="w-full lg:w-1/2 aspect-video rounded-lg"
                    src={product?.video_url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            )}
          </div>
        )}

        {/* Review Section */}
        {product?.reviews?.length > 0 && (
          <div className="mt-12">
            {loading ? (
              <Skeleton count={3} height={100} className="mb-4" />
            ) : (
              <>
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <div className="mt-4 space-y-4">
                  {product?.reviews?.map((r, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg shadow">
                      <div className="flex items-center">
                        <Rating rating={r.average_rating / 20} />
                        <span className="ml-2 text-gray-700 font-semibold">
                          {r.nickname}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{r.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
