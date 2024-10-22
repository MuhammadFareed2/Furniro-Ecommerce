import React, { useEffect, useState } from 'react';
import { db, Auth } from '../firebase/firebase'; // Import your Firebase configuration
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import items from "../constants/items.json";
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch user state and cart items on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user);
        fetchCartItems(user.uid); // Fetch items if user is logged in
      } else {
        setUser(null);
        setCartItems([]); // Clear cart if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch cart items from Firestore
  const fetchCartItems = async (userId) => {
    try {
      const cartRef = collection(db, 'users', userId, 'cart');
      const cartSnapshot = await getDocs(cartRef);
      const itemsArray = cartSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(itemsArray); // Set fetched cart items to state
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };

  // Remove an item from cart
  const handleRemoveItem = async (itemId) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'cart', itemId)); // Remove item from Firestore
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Remove from state
      } catch (error) {
        console.error("Error removing item: ", error);
      }
    }
  };

  // Recalculate the total whenever cart items change
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cartItems.reduce((acc, item) => {
        const product = items[item.key]; // Match the item from local items.json
        return acc + (product?.price.currentPrice * item.quantity || 0); // Calculate total for each item
      }, 0);
      setTotal(totalPrice); // Update total price
    };

    calculateTotal();
  }, [cartItems]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {user ? (
        cartItems.length > 0 ? (
          <div>
            {cartItems.map(item => {
              const product = items[item.key]; // Get product from local JSON
              return (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    {product && (
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        className="w-16 h-16 rounded-lg mr-4"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold">{product?.name}</h2>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    ${(product?.price.currentPrice * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            {/* Total Price */}
            <div className="mt-6 font-bold text-lg">
              Total: ${total.toFixed(2)}
            </div>
            {/* Single Checkout Button */}
            <div className="mt-6">
              <Link to="/checkout">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )
      ) : (
        <p>Please log in to view your cart.</p>
      )}
    </div>
  );
};

export default Cart;
