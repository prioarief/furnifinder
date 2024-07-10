import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getMostProductView, getProducts } from '../utils/api';

import notFoundImg from '../assets/404.png';
import heroImg from '../assets/hero.png';
import logoImg from '../assets/new_logo.png';
import Header from '../components/Header';

const Home = () => {
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
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const navigate = useNavigate();

  const handleScroll = () => {
    const isEndOfScroll =
      Math.floor(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight;

    if (isEndOfScroll) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  useEffect(() => {
    getMostProductView(loading, setLoading, setMostViewedItems);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setTimeout(() => {
      getProducts(page, search, loading, setLoading, setProducts, setTotalPage);
    }, 500);
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
    <div className="min-h-screen bg-gray-300">
      <Header>
        <div className="text-center p-6">
          <div className="mt-4">
            <form className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-white border-2 placeholder-white border-white rounded-lg bg-transparent focus:border-white "
                  placeholder={displayedText}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </Header>

      <main className="max-w-7xl mx-auto py-12">
        {search === '' && (
          <section className="p-2 mb-10">
            <h2 className="text-2xl text-black font-bold font-bold mb-4">
              Produk paling populer
            </h2>
            <div className="flex overflow-x-auto gap-3">
              {mostViewedItems.map((item, i) => (
                <ProductCard
                  item={item}
                  key={i}
                  onClick={() =>
                    navigate('/detail', { state: { id: item.id } })
                  }
                  style={{ minWidth: '280px' }}
                />
              ))}
            </div>
          </section>
        )}

        <section className="p-2">
          {products.length < 1 ? (
            <img
              src={notFoundImg}
              className="m-auto h-2/4 w-2/4"
              alt="Not Found"
            />
          ) : (
            <>
              <h2 className="text-2xl text-black font-bold mb-4">
                Produk Terbaru
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} Furni Finder By SATSET Team. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
