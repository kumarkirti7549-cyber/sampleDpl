 import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  const token = localStorage.getItem("token");

  // Get Cart
  const getCart = async () => {
    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(
        "/cart/update",
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Product
  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Cart is Empty 🛒</h1>
      </div>
    );
  }

  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold mb-10">
        My Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Left */}

        <div className="lg:col-span-2 space-y-6">

          {cart.items.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center"
            >

              <div className="flex gap-5">

                <img
                  src={item.product.image}
                  alt=""
                  className="w-32 h-32 rounded-lg object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.product.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.product.description}
                  </p>

                  <h3 className="text-orange-500 font-bold text-xl mt-3">
                    ₹ {item.product.price}
                  </h3>

                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-xl">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              <button
                onClick={() => removeItem(item.product._id)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>

            </div>

          ))}

        </div>

        {/* Right */}

        <div className="bg-white rounded-xl shadow-lg p-8 h-fit">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between text-lg mb-4">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between text-lg mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-orange-500">
              ₹ {totalPrice}
            </span>

          </div>

          <button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold">
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;