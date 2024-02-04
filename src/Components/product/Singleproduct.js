import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(productId);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
   <div className='flex container p-3'>
    <Link to='/dashboard' className='text-gray-700'>Dashboard</Link>
    <MdKeyboardArrowRight className='h-6 w-6' />
    <Link to='/product' className='text-gray-700'>All Products</Link>
    <MdKeyboardArrowRight className='h-6 w-6' />
    <Link to='/product/:productId' className='font-bold'>{product.title}</Link>
</div>

     <div className="group flex gap-20 justify-center mb-20 mt-16 container max-sm:flex-col">
            <div className="bg-gray-200  rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.thumbnail}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
      
              <div className='mt-4'>
                <h3 className="text-sm text-gray-700 flex gap-10">
                  <a href={product.href}>
                    <span className='text-xl font-semibold'>{product.title}</span>
                  </a>
                  <div className='flex gap-2'>
                  <p className="text-[16px] font-semibold text-green-600">${product.price}</p>
            <span class="ml-3 text-[16px] font-semibold text-gray-400 line-through dark:text-gray-400">{product.discountPercentage}</span>
            </div>
                </h3>
                <p>Brand: <span className="mt-1 text-sm text-gray-700">{product.brand}</span></p>
                <p> Category: <span className="mt-1 text-sm text-gray-700"> {product.category}</span></p>
                <p>Availability: <span className="mt-1 text-sm font-semibold text-green-700">{product.stock}</span></p> 
                <p>Rating: <span className='font-bold text-gray-700'>{product.rating}</span></p>
                <p className="mt-1 text-sm text-gray-700 w-2/3">{product.description}</p>
               
                <div className='flex gap-10 my-2 '>
                <button href="#" className="w-1/2 px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
Add to cart
</button>
<button href="#" className="w-1/2 px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
Buy now</button>
</div>
                </div>
              
</div>
</div>  
  );
}

export default SingleProduct;
