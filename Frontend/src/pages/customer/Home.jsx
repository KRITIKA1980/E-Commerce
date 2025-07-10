import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiShoppingCart, FiTruck } from 'react-icons/fi';

const Home = () => {
  // Food categories data
  const categories = [
    {
      name: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      count: 24
    },
    {
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      count: 18
    },
    {
      name: 'Sushi',
      image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a',
      count: 15
    },
    {
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307',
      count: 12
    },
  ];

  // Popular dishes data
  const popularDishes = [
    {
      id: 1,
      name: 'Double Cheese Burger',
      price: 12.99,
      rating: 4.8,
      prepTime: '15-20 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      price: 14.99,
      rating: 4.6,
      prepTime: '20-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38'
    },
    {
      id: 3,
      name: 'California Roll',
      price: 18.99,
      rating: 4.9,
      prepTime: '10-15 min',
      image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a'
    },
  ];

  // Features data
  const features = [
    {
      icon: <FiClock className="text-3xl text-orange-500" />,
      title: "Fast Delivery",
      description: "Get your food delivered in under 30 minutes"
    },
    {
      icon: <FiStar className="text-3xl text-orange-500" />,
      title: "Quality Food",
      description: "Fresh ingredients from trusted suppliers"
    },
    {
      icon: <FiShoppingCart className="text-3xl text-orange-500" />,
      title: "Easy Ordering",
      description: "Simple ordering process with instant confirmation"
    },
    {
      icon: <FiTruck className="text-3xl text-orange-500" />,
      title: "Free Delivery",
      description: "Free delivery on orders over $25"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Delicious Food Delivered To Your Doorstep
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Order your favorite meals from the best restaurants in town
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg transition duration-300 text-center"
              >
                Order Now
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-bold px-8 py-3 rounded-lg transition duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" 
              alt="Delicious food" 
              className="rounded-xl shadow-2xl w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Food Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our diverse selection of delicious food categories
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/menu?category=${category.name.toLowerCase()}`}
                  className="group block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 relative"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                    <p className="text-gray-200 text-sm">{category.count} items</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Popular Dishes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Customer favorites - dishes that everyone loves
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-sm font-bold flex items-center">
                  <FiStar className="text-yellow-500 mr-1" />
                  {dish.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{dish.name}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                    <FiClock className="inline mr-1" />
                    {dish.prepTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">${dish.price.toFixed(2)}</span>
                  <Link
                    to={`/food/${dish.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to order your favorite food?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8"
          >
            Download our app for exclusive offers and faster ordering!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold transition duration-300 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              App Store
            </button>
            <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-bold transition duration-300 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
              Google Play
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
