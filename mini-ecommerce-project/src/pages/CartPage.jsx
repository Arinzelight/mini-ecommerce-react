/* eslint-disable prettier/prettier */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  CLEAR_CART,
} from "@/store/actionTypes";
import DefaultLayout from "@/layouts/default";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  const handleIncrease = (id) => {
    dispatch({ type: INCREASE_QTY, payload: id });
  };

  const handleDecrease = (id) => {
    dispatch({ type: DECREASE_QTY, payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-8 py-5 px-4 bg-secondary-blush dark:bg-transparent rounded-md transition-all duration-500 min-h-screen">
        <h1 className="text-center text-5xl font-semibold text-primary dark:text-secondary-mint">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <button
                className="text-sm text-red-500 border border-red-400 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4"
                >
                  <img
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    src={
                      item.images?.[0] ||
                      "https://placehold.co/300x200?text=No+Image"
                    }
                  />
                  <h2 className="text-lg font-semibold text-primary dark:text-white truncate">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-primary dark:text-secondary-mint font-semibold mb-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      className="w-10 h-10 flex items-center justify-center pb-1 rounded-full bg-gray-300 text-red-500 hover:bg-gray-400 text-4xl"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="w-10 h-10 flex items-center justify-center pb-1 rounded-full bg-gray-300 text-green-500 hover:bg-gray-400 text-2xl"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-4 block w-full text-sm text-red-600 hover:underline"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>

                  <Link
                    className="mt-2 block text-sm text-primary dark:text-secondary-mint hover:underline"
                    to={`/products/${item.slug}`}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center text-xl font-semibold text-primary dark:text-secondary-mint">
              Total: ${total.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
