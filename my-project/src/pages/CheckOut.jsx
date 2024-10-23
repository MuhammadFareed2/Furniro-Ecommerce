import React, { useEffect, useState } from 'react';
import { db, Auth } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'; 
import items from '../constants/items.json';

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [total, setTotal] = useState(0); 
  const [user, setUser] = useState(null); 


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user);
        fetchCartItems(user.uid); 
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

 
  const fetchCartItems = async (userId) => {
    try {
      const cartRef = collection(db, 'users', userId, 'cart');
      const cartSnapshot = await getDocs(cartRef);
      const itemsArray = cartSnapshot.docs.map((doc) => ({
        id: doc.id, 
        quantity: doc.data().quantity, 
      }));
      setCartItems(itemsArray); 
      calculateTotal(itemsArray); 
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };

  const calculateTotal = (itemsArray) => {
    const totalPrice = itemsArray.reduce((acc, cartItem) => {
      const product = items[cartItem.id]; 
      return acc + (product?.price.currentPrice || 0) * cartItem.quantity; 
    }, 0);
    setTotal(totalPrice); 
  };


  const clearCart = async () => {
    if (user) {
      const cartRef = collection(db, 'users', user.uid, 'cart');
      const cartSnapshot = await getDocs(cartRef);
      const deletePromises = cartSnapshot.docs.map(doc => deleteDoc(doc.ref));

      await Promise.all(deletePromises);
      setCartItems([]); 
    }
  };

  // Handle order placement
  const handleOrder = async () => {
    alert('Order placed successfully!');
    await clearCart(); 
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((cartItem) => {
            const product = items[cartItem.id];

            return (
              <div key={cartItem.id} className="flex justify-between items-center border-b py-4">
                <div>
                  <h2 className="text-xl font-semibold">{product?.name || 'Product not found'}</h2>
                  <p>Quantity: {cartItem.quantity}</p>
                </div>
                <div className="font-semibold">
                  ${(product?.price.currentPrice * cartItem.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}

          <div className="mt-6 font-bold text-lg">Total: ${total.toFixed(2)}</div>

          <button
            onClick={handleOrder}
            className="mt-6 px-6 py-3 bg-[#B88E2F] text-white font-bold rounded-lg hover:bg-[#a67d25] transition duration-300"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p>Your cart is empty. Add items to your cart before checking out.</p>
      )}
    </div>
  );
};

export default CheckOut;
