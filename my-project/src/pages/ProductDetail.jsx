import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import items from "../constants/items.json";
import { db, Auth } from '../firebase/firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProductDetail() {
  const { key } = useParams();
  const product = items[key];

  const [largeImage, setLargeImage] = useState(product.image);
  const [smallImage, setSmallImage] = useState(product.variants[0]?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageClick = (smallImage) => {
    setSmallImage(largeImage);
    setLargeImage(smallImage.image);
  };

  const handleColorChange = (variant) => {
    setSmallImage(largeImage);
    setLargeImage(variant.image);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("You need to be logged in to add items to your cart.");
      return;
    }

    const cartItem = {
      key: key,
      quantity: quantity,
    };

    try {
    
      await setDoc(doc(db, 'users', user.uid, 'cart', key), cartItem, { merge: true });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart: ', error);
      alert('Failed to add item to cart.');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center">
            
            <img
              src={largeImage}
              alt={product.imageAlt}
              className="w-full h-auto rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105"
            />
           
            <div className="flex mt-4 space-x-2">
              {product.variants.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={img.imageAlt}
                  className="w-16 h-16 rounded-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </div>
        </div>

       
        <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-2">
            ${product.price.currentPrice.toFixed(2)}
          </p>

         
          {product.description && (
            <p className="mt-4 text-gray-700">{product.description}</p>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800">Size</h3>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800">Color</h3>
              <div className="flex space-x-2 mt-2">
                {product.variants.map((variant) => (
                  <span
                    key={variant.id}
                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                    onClick={() => handleColorChange(variant)}
                    style={{ backgroundColor: variant.color || "white" }}
                  ></span>
                ))}
              </div>
            </div>
          )}

         
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">Quantity</h3>
            <div className="flex space-x-2 items-center mt-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                onClick={() => handleQuantityChange(-1)} 
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

        
          <div className="mt-8 flex space-x-4">
            <button
              className="flex-1 px-6 py-3 bg-white text-gray-800 font-semibold border border-black rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
              onClick={handleAddToCart} 
            >
              Add to Cart
            </button>
            <button className="flex-1 px-6 py-3 bg-white text-gray-800 font-semibold border border-black rounded-lg hover:bg-gray-100 transition duration-300 shadow-md">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
