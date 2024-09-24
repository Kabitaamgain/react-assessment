// src/Components/CheckoutPage/CheckoutPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const { cart = [] } = location.state || {}; // Ensure cart is an array, default to empty array if undefined

  console.log(cart); // Add this line to check the cart data in the browser console

  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="text-center mt-4 text-red-600">No cart items available</div>;
  }
  return (
    <div className='bg-gray-50 '>
      <div className="flex items-center p-6 mx-8 text-gray-700">
        <Link to='/home' className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/cart' className="hover:text-blue-600 ">Cart</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/checkout' className="hover:text-blue-600 font-bold">Checkout</Link>
      </div> 
      
      <div className="container mx-auto px-6 py-3 bg-gray-50 min-h-screen flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h2>
        
        <div className='flex gap-10'>
          <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Order Summary</h3>
            
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.id} className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1 text-gray-800">{item.product.name}</h4>
                    <p className="text-gray-600">Price: <span className="font-medium">${item.product.price.toFixed(2)}</span></p>
                    <p className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                    <p className="text-gray-600">Total: <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span></p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 border-t pt-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Total: <span className="text-blue-600">${cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</span>
              </h4>
            </div>
          </div>
          
          <form className="bg-white p-6 shadow-lg rounded-lg w-full h-fit max-w-3xl space-y-4">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Shipping Address</label>
              <textarea
                id="address"
                rows="2"
                placeholder="123 Main St, Apt 4B, New York, NY 10001"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="payment" className="block text-gray-700 font-medium mb-2">Payment Method</label>
              <select
                id="payment"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="esewa">Esewa</option>
                <option value="cash-on-delivery">Cash On Delivery</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
