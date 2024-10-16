import React, { useState } from 'react';
import Dynamic from "../assets/images/dynamic.png";
import ProductCard from '../components/ProductCard';
import items from "../constants/items.json";

const Shop = () => {
  
  const [visibleItems, setVisibleItems] = useState(16); 

  const [selectedType, setSelectedType] = useState('All'); 
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(1000); 
  const [sortOption, setSortOption] = useState(''); 

 
  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 16); 
  };

  
  const filteredAndSortedItems = items
    .filter(item => (selectedType === 'All' || item.typeName === selectedType)) 
    .filter(item => item.price.currentPrice >= minPrice && item.price.currentPrice <= maxPrice) 
    .sort((a, b) => {
      if (sortOption === 'lowToHigh') {
        return a.price.currentPrice - b.price.currentPrice; 
      } else if (sortOption === 'highToLow') {
        return b.price.currentPrice - a.price.currentPrice; 
      } else {
        return 0;
      }
    });

  return (
    <>

      <div className="relative h-[316px]">
        <img src={Dynamic} alt="" className="h-[316px] opacity-70 w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold Shop">Shop</h1>
          <div className="flex Shop space-x-2 mt-2">
            <h2 className="text-lg">Home</h2>
            <span className="text-lg">&gt;</span>
            <h2 className="text-lg">Shop</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-6 bg-[#F9F1E7] shadow-md border-b border-gray-200">
        
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          >
            <option value="All">All Types</option>
            <option value="Furniture">Furniture</option>
            <option value="Lighting">Lighting</option>
            <option value="Decor">Decor</option>
            
          </select>
        </div>

    
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="border px-4 py-2 w-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          />
          <span>-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="border px-4 py-2 w-20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          />
        </div>

      
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-700">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-12 bg-white">
        {filteredAndSortedItems.slice(0, visibleItems).map((item, index) => (
          <ProductCard
            key={index}
            index={index}
            image={item.image}
            imageAlt={item.imageAlt}
            name={item.name}
            currency={item.price.currency}
            currentPrice={item.price.currentPrice}
            typeName={item.typeName}
          />
        ))}
      </div>

      
      {visibleItems < filteredAndSortedItems.length && (
        <div className="flex justify-center mb-12">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-[#B88E2F] text-white font-bold rounded-lg hover:bg-[#a67d25] transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Shop