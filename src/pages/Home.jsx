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

  const navigate = useNavigate();

  const handleScroll = () => {
    const isEndOfScroll =
      window.innerHeight + document.documentElement.scrollTop ===
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

  return (
    <div className="min-h-screen bg-blue-400">
      <header className="text-center p-6">
        <h1 className="text-4xl text-white font-bold mb-2 font-sans">
          Furniture Finder
        </h1>
        <p className="text-white">Enhance Your Living Space</p>
        <div className="mt-4">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Search for furniture..."
            className="w-full max-w-2xl mx-auto p-3 border border-gray-300 rounded-md"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto pb-12">
        {search === '' && (
          <section className="p-2 mb-10">
            <h2 className="text-2xl text-white font-bold mb-4">
              Most Viewed Products
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
              src="https://i.ibb.co.com/0m7rv6C/404.png"
              className="m-auto h-2/4 w-2/4"
              alt=""
              srcSet=""
            />
          ) : (
            <>
              <h2 className="text-2xl text-white font-bold mb-4">
                New Products
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
