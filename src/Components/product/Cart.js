// src/Components/UserCart/UserCart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const UserCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users/6/carts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCart(data.carts[0]); // Assuming there's only one cart
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = () => {
    if (cart) {
      // Navigate to the checkout page and pass the cart data as state
      navigate('/checkout', { state: { cart } });
    } else {
      alert('Cart is empty');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (!cart) {
    return <div className="text-center mt-4 text-gray-700">No cart available</div>;
  }

  return (
    <div className="relative container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl rounded-xl">
      <div className="flex items-center mb-6 mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/cart' className="hover:text-blue-600 font-bold">Cart</Link>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Your Shopping Cart</h2>
      
      <div className="overflow-x-auto mb-16">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Image</th>
              <th className="py-3 px-4 text-left text-gray-700">Title</th>
              <th className="py-3 px-4 text-left text-gray-700">Price</th>
              <th className="py-3 px-4 text-left text-gray-700">Quantity</th>
              <th className="py-3 px-4 text-left text-gray-700">Total</th>
              <th className="py-3 px-4 text-left text-gray-700">Discount</th>
              <th className="py-3 px-4 text-left text-gray-700">Discounted Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map(product => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="py-4 px-4 text-gray-700">{product.title}</td>
                <td className="py-4 px-4 text-gray-700">${product.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-700">{product.quantity}</td>
                <td className="py-4 px-4 text-gray-700">${(product.price * product.quantity).toFixed(2)}</td>
                <td className="py-4 px-4 text-gray-700">{product.discountPercentage}%</td>
                <td className="py-4 px-4 text-gray-700">${product.discountedTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td colSpan="6" className="py-3 px-4 text-right text-gray-700 font-semibold">Total</td>
              <td className="py-3 px-4 text-gray-700 font-semibold">${cart.total.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6" className="py-3 px-4 text-right text-gray-700 font-semibold">Discounted Total</td>
              <td className="py-3 px-4 text-gray-700 font-semibold">${cart.discountedTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="absolute bottom-4 right-32">
        <button 
          onClick={handleCheckout} 
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default UserCart;
