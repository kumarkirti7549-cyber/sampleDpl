 import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  const getCartCount = async () => {
    if (!token) return;

    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const totalItems = res.data.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCount();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          MiniShop
        </Link>

        {/* Search */}

        <div className="hidden md:block">

          <input
            type="text"
            placeholder="Search Products..."
            className="border w-80 px-4 py-2 rounded-lg outline-none focus:border-orange-500"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-orange-500 font-medium"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            <ShoppingCart size={28} />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">

              {cartCount}

            </span>

          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">

              <h2 className="font-semibold">
                Hello, {user?.name}
              </h2>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;