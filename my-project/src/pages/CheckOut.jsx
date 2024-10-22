import React, { useEffect, useState } from 'react';
import { db, Auth } from '../firebase/firebase'; // Import your Firebase config
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore methods
import { onAuthStateChanged } from 'firebase/auth'; // Auth methods
import items from '../constants/items.json'; // Local product data

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]); // Cart items from Firestore
  const [total, setTotal] = useState(0); // Total price of the cart
  const [user, setUser] = useState(null); // User state

  // Check if user is authenticated and fetch cart items
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user);
        fetchCartItems(user.uid); // Fetch cart items for this user
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch cart items from Firestore
  const fetchCartItems = async (userId) => {
    try {
      const cartRef = collection(db, 'users', userId, 'cart');
      const cartSnapshot = await getDocs(cartRef);
      const itemsArray = cartSnapshot.docs.map((doc) => ({
        id: doc.id, // The product key (id) from Firestore
        quantity: doc.data().quantity, // Quantity of the product
      }));
      setCartItems(itemsArray); // Set fetched items to state
      calculateTotal(itemsArray); // Calculate total price
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };

  // Calculate total price based on items in cart and their quantities
  const calculateTotal = (itemsArray) => {
    const totalPrice = itemsArray.reduce((acc, cartItem) => {
      const product = items[cartItem.id]; // Find product from local items.json by its id
      return acc + (product?.price.currentPrice || 0) * cartItem.quantity; // Multiply price by quantity
    }, 0);
    setTotal(totalPrice); // Set total price
  };

  // Clear the user's cart
  const clearCart = async () => {
    if (user) {
      const cartRef = collection(db, 'users', user.uid, 'cart');
      const cartSnapshot = await getDocs(cartRef);
      const deletePromises = cartSnapshot.docs.map(doc => deleteDoc(doc.ref)); // Create an array of delete promises

      await Promise.all(deletePromises); // Wait for all delete operations to complete
      setCartItems([]); // Clear cart items from state
    }
  };

  // Handle order placement
  const handleOrder = async () => {
    alert('Order placed successfully!');
    await clearCart(); // Clear the cart after placing the order
    // Here, you would also add your order placement logic (e.g., saving order details to the database)
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((cartItem) => {
            const product = items[cartItem.id]; // Match product from items.json using id

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
