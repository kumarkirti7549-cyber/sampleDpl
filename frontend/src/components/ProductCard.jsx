 import api from "../services/api";
import toast from "react-hot-toast";

function ProductCard({ product }) {

  const addToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First");
      return;
    }

    try {

      const res = await api.post(
        "/cart/add",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }

  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">

      {/* Product Image */}

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-cover"
      />

      {/* Product Details */}

      <div className="p-5">

        <h2 className="text-xl font-bold line-clamp-1">
          {product.title}
        </h2>

        <p className="text-gray-500 mt-2 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-2xl font-bold text-orange-500">
            ₹ {product.price}
          </span>

          <button
            onClick={addToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;