import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { MdKeyboardArrowRight } from "react-icons/md";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [showPagination, setShowPagination] = useState(true);
  const itemsPerPage = 8;
  const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
        const data = await response.json();
        setProducts(data.products);
      setShowPagination(true);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  useEffect(() => {
  

    fetchData();
  }, [currentPage]);
  if (!products) {
    return <div>Loading...</div>;
  }

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data.products || []);
      setShowPagination(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <div className='flex gap-4 p-3'>
    <div className='flex mx-3 '>
    <Link to='/dashboard' className='text-gray-700'>Dashboard</Link>
    <MdKeyboardArrowRight className='h-6 w-6 '/>
    <Link to ='/product' className='font-bold'>All Products</Link>
    </div>
      <Categories
        setProducts={setProducts}
        fetchProductsByCategory={fetchProductsByCategory}
        setFilteredProducts={setFilteredProducts}
        fetchData={fetchData}
        className="px-3"
      />
      </div>
      <div className=" p-3 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
        {products.map((product) => (
          <div className='relative'>
            <div key={product.id} className="group relative shadow-lg h-full">
              <div className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.thumbnail}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3 pb-16">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                    </a>
                    <p>Category: {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Rating: {product.rating}</p>
                </div>
                <p className="text-[16px] font-semibold text-green-600">${product.price}</p>
                <span class="ml-3 text-[16px] font-semibold text-gray-400 line-through dark:text-gray-400">{product.discountPercentage}</span>

              </div>

            </div>
            <Link to={`/product/${product.id}`}
             className='absolute bottom-0 left-1/4 bg-primary text-white p-2 mb-3 flex mx-auto rounded-lg px-5'>
                View More
            
            </Link>
          </div>
        ))}

      </div>
          {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`mx-2 px-3 flex gap-1 items-center rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-primary'}`}
            disabled={currentPage === 1}
          >
            <FiArrowLeft /> Prev
          </button>
        <span className='p-1 font-semibold text-gray-600 text-[16px]'>
          {currentPage} of {totalPages}
        </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`mx-2 px-3 py-1 flex gap-1 items-center rounded-md ${currentPage >= totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-primary'}`}
            disabled={currentPage >= totalPages}
          >
            Next <FiArrowRight />
          </button>

        </div>
      )}
    </>
  );
}

export default Product;