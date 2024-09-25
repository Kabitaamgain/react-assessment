import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]); // List of provinces
  const [allDistricts, setAllDistricts] = useState([]); // List of all districts
  const [filteredDistricts, setFilteredDistricts] = useState([]); // Districts filtered by selected province
  const [selectedProvince, setSelectedProvince] = useState(''); // Selected province
  const [selectedDistrict, setSelectedDistrict] = useState(''); // Selected district

  const location = useLocation();
  const { cart = { products: [] } } = location.state || {}; // Ensure cart is an object with a products array

  // Fetch provinces from the API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/provinces');
        const data = await response.json();
        setProvinces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch all districts from the API
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/districts');
        const data = await response.json();
        setAllDistricts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  // Filter districts based on selected province
  useEffect(() => {
    if (selectedProvince) {
      const filtered = allDistricts.filter(
        (district) => district.province_id === selectedProvince
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedProvince, allDistricts]);

  // Handle province selection
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict(''); // Reset selected district when province changes
  };

  // Handle district selection
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // Calculate total price dynamically
  const total = cart.products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  if (cart.products.length === 0) {
    return <div className="text-center mt-4 text-red-600">No cart items available</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex items-center p-4 mx-8 text-gray-700">
        <Link to="/home" className="hover:text-blue-600">Home</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to="/checkout" className="hover:text-blue-600 font-bold">Checkout</Link>
      </div>

      <div className="container mx-auto px-6 mb-10 bg-gray-50">
        <h2 className="text-2xl font-bold m-4 text-gray-800">Check Out</h2>

        <div className="flex justify-between gap-10">
          {/* Shipping Address Form */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-3xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Address</h3>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-600 mb-2">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-600 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm text-gray-600 mb-2">Phone No.</label>
                <input
                  id="phone"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="province" className="block text-sm text-gray-600 mb-2">Province</label>
                  <select
                    id="province"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="district" className="block text-sm text-gray-600 mb-2">District</label>
                  <select
                    id="district"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince}
                  >
                    <option value="">Select District</option>
                    {filteredDistricts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm text-gray-600 mb-2">City</label>
                  <input
                    id="city"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label htmlFor="postal" className="block text-sm text-gray-600 mb-2">Postal Code</label>
                  <input
                    id="postal"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    placeholder="Postal code"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="street" className="block text-sm text-gray-600 mb-2">Street Address</label>
                <input
                  id="street"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  placeholder="Enter your street address"
                />
              </div>
            </form>
          </div>

          {/* Billing Details */}
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Billing Details</h3>

            <ul className="space-y-4 mb-6">
              {cart.products.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">Price: Rs. {Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-800">x{item.quantity}</p>
                </li>
              ))}
            </ul>

            <div className="text-right border-t border-gray-200 pt-4">
              <p className="text-lg font-semibold text-gray-700">Total: Rs. {total.toFixed(2)}</p>
              <Link to="/payment" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500">
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;