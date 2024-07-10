import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getMostProductView, getProducts } from '../utils/api';

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
    <div className="min-h-screen bg-blue-400">
      <header className="flex justify-between items-center p-6 bg-blue-400">
        <div className="text-white text-xl lg:text-2xl font-bold">
          <img
            src="https://i.ibb.co.com/p12nxfv/logo-no-background.png"
            className="lg:w-1/6 w-1/2"
            alt=""
          />
        </div>
        <nav className="flex gap-6">
          <button
            onClick={() => alert('coming soon')}
            className="text-white hover:text-blue-800"
          >
            Blog
          </button>
          <button
            onClick={() => alert('coming soon')}
            className="text-white hover:text-blue-800"
          >
            Promo
          </button>
        </nav>
      </header>

      {search === '' && (
        <section className="hero-section text-white">
          <div className="max-w-7xl mx-auto text-center px-4">
            {/* <h1 className="text-4xl lg:text-6xl font-bold">Selamat Datang di FurniFinder</h1> */}
            <img
              src="https://i.ibb.co.com/jz50BMC/undraw-relaxing-at-home-re-mror-1.png"
              className="m-auto lg:w-3/5 w-full"
              alt=""
            />
            {/* <p className="text-lg lg:text-2xl mb-8">Temukan furniture terbaik untuk rumahmu</p> */}
            {/* <a href='' className="bg-white text-blue-400 w-1/2 py-2 px-6 rounded-lg text-lg">Cari furniture</a> */}
          </div>
        </section>
      )}

      <div className="text-center p-6">
        {/* <h1 className="lg:text-4xl text-2xl text-white font-bold mb-2 font-sans">
          Enhance Your Living Space
        </h1> */}
        <p className="text-white">Temukan furniture terbaik untuk rumahmu</p>
        <div className="mt-4">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-white sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-black"
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
                className="block w-full p-4 ps-10 text-sm text-black border border-blue-400 rounded-lg bg-white focus:ring-blue-400 focus:border-blue-400 "
                placeholder={displayedText}
                required
              />
            </div>
          </form>

          {/* <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder={displayedText}
            className="w-full max-w-2xl mx-auto p-3 border border-gray-300 rounded-md"
          /> */}
        </div>
      </div>

      <main className="max-w-7xl mx-auto pb-12">
        {search === '' && (
          <section className="p-2 mb-10">
            <h2 className="text-2xl text-white font-bold mb-4">
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
              src="https://i.ibb.co/0m7rv6C/404.png"
              className="m-auto h-2/4 w-2/4"
              alt="Not Found"
            />
          ) : (
            <>
              <h2 className="text-2xl text-white font-bold mb-4">
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
