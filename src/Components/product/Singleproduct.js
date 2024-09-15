import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        // Use template literal correctly to fetch the single product
        const response = await fetch(`http://127.0.0.1:8000/api/getsingleproduct/${id}`);
        const { data } = await response.json();
        
        // Set product details including category
        setProduct(data);

        // Fetch related products based on the category
        const relatedResponse = await fetch(`http://127.0.0.1:8000/api/singlecategory/${data.category.id}`);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData.products.filter(p => p.id !== id));

        // If your API supports reviews, you can keep this functionality
        const reviewsResponse = await fetch(`http://127.0.0.1:8000/api/getsingleproduct/${id}/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails(productId);
  }, [productId]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setReviews([...reviews, newReview]);
      setNewReview({ author: '', rating: 5, comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  if (!product) {
    return <div className="text-center p-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-6 text-gray-700">
        <Link to='/dashboard' className="hover:text-blue-600">Dashboard</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <Link to='/product' className="hover:text-blue-600">All Products</Link>
        <MdKeyboardArrowRight className="mx-2 text-gray-400" />
        <span className="font-bold">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <img
            alt={product.name}
            src={product.image}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</h3>
          <div className="flex items-center mb-4">
            <p className="text-xl font-bold text-green-600">${product.price}</p>
          </div>
          <p className="text-gray-700 mb-2">Category: <span className="font-medium">{product.category.name}</span></p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex gap-4">
            <Link to="/usercart" className="flex-1 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add to Cart</Link>
            <Link to="#" className="flex-1 px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100">Buy Now</Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Products</h2>
        <div className="flex gap-6 overflow-x-auto">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-gray-100 p-4 w-64 rounded-lg shadow-md">
              <img
                src={relatedProduct.thumbnail}
                alt={relatedProduct.title}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{relatedProduct.title}</h3>
              <p className="text-gray-700 mb-2">${relatedProduct.price}</p>
              <Link to={`/product/${relatedProduct.id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b border-gray-300 pb-4">
              <div className="flex items-center mb-2">
                <p className="text-lg font-medium text-gray-900">{review.author}</p>
                <span className="text-gray-600 ml-2">({review.rating} Stars)</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}

        {/* Add Review Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Your Review</h3>
          <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newReview.author}
                onChange={handleReviewChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              >
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
