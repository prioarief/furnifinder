import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const getMostProductView = async (
  loading,
  setLoading,
  setMostViewedItems
) => {
  if (loading) return;
  setLoading(true);

  try {
    const { data } = await axios.get(
      `${baseUrl}/api/v1/products/popular`
    );

    const { data: newProducts } = data;
    setMostViewedItems(newProducts);
  } catch (error) {
    console.error('Error fetching popular products:', error);
  } finally {
    setLoading(false);
  }
};

export const getProducts = async (
  page,
  search,
  loading,
  setLoading,
  setProducts,
  setTotalPage,
  append = false
) => {
  if (loading) return;
  setLoading(true);

  try {
    const config = {
      params: {
        limit: 15,
        page,
        ...(search !== '' && { keyword: search }),
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/v1/products`,
      config
    );

    const { data: newProducts, total_page } = data;
    setProducts((prevProducts) =>
      !append ? newProducts : [...prevProducts, ...newProducts]
    );
    setTotalPage(total_page);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false);
  }
};

export const getProductDetail = async (id, loading, setLoading, setProduct) => {
  if (loading) return;
  setLoading(true);

  try {
    const { data } = await axios.get(
      `${baseUrl}/api/v1/products/${id}`
    );

    const { data: newProducts } = data;
    setProduct(newProducts);
  } catch (error) {
    console.error('Error fetching product detail:', error);
  } finally {
    setLoading(false);
  }
};
