import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoadingScreen from '../components/Loading';

import notFoundImg from '../assets/404.png';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../utils/api';
import Footer from '../components/Footer';

const Blog = () => {
  const [Blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);

  const placeholders = [
    'Kamar tidur',
    'Ruang keluarga',
    'Meja belajar',
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getBlogs(page, search, loading, setLoading, setBlogs, setTotalPage, true);
  }, [page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 0) {
        getBlogs(page, search, loading, setLoading, setBlogs, setTotalPage);
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
      >
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

      {loading && <LoadingScreen />}

      <main className="max-w-7xl mx-auto py-12">
        <section className="p-2">
          {Blogs.length < 1 ? (
            <img
              src={notFoundImg}
              className="m-auto h-2/4 w-2/4"
              alt="Not Found"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {Blogs.map((item, i) => (
                  <BlogCard item={item} key={i} />
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

      <Footer />
    </div>
  );
};

export default Blog;
