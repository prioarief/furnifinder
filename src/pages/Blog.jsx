import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import LoadingScreen from '../components/Loading';

import { getMostProductView, getProducts } from '../utils/api';
import notFoundImg from '../assets/404.png';

const Blog = () => {
  const [products, setProducts] = useState([]);
  const [mostViewedItems, setMostViewedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);

  const placeholders = [
    'Lampu belajar',
    'Perabot ruang tv',
    'Perlengkapan makan',
    'Mainan anak',
    'Selimut',
    'Gorden',
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getMostProductView(loading, setLoading, setMostViewedItems);
    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getProducts(
      page,
      search,
      loading,
      setLoading,
      setProducts,
      setTotalPage,
      true
    );
  }, [page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 0) {
        getProducts(
          page,
          search,
          loading,
          setLoading,
          setProducts,
          setTotalPage
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    if (charIndex < placeholders[placeholderIndex].length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + placeholders[placeholderIndex].charAt(charIndex)
        );
        setCharIndex(charIndex + 1);
      }, 100); // Typing speed

      return () => clearTimeout(typingTimeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
      }, 2000); // Pause duration after typing

      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, placeholders, placeholderIndex]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Header
        title="Temukan Inspirasi Terbaik Untuk Rumahmu!"
        subtitle="Temukan berbagai artikel inspiratif dan
            informatif tentang tren desain terbaru, tips memilih furniture yang
            tepat, serta panduan merawat dan menata ruangan agar tampil estetis
            dan fungsional."
      />

      {loading && <LoadingScreen />}

      <main className="max-w-7xl mx-auto py-12">
        <section className="p-2">
          {products.length < 1 ? (
            <img
              src={notFoundImg}
              className="m-auto h-2/4 w-2/4"
              alt="Not Found"
            />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {products.map((item, i) => (
                  <ProductCard
                    item={item}
                    key={i}
                    onClick={() =>
                      navigate('/detail', { state: { id: item.id } })
                    }
                  />
                ))}
              </div>
            </>
          )}
        </section>
        {page < totalPage && (
          <div className="flex m-auto mt-5">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="m-auto outline outline-offset-2 outline-gray-800 text-black py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition duration-200"
            >
              Lebih Banyak
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Furni Finder By SATSET Team</p>
      </footer>
    </div>
  );
};

export default Blog;
