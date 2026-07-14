 import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}

      <div className="bg-orange-500 text-white py-16">

        <div className="max-w-7xl mx-auto px-5 text-center">

          <h1 className="text-5xl font-bold">
            Welcome To MiniShop
          </h1>

          <p className="mt-4 text-lg">
            Buy Best Products At Affordable Prices
          </p>

          <div className="mt-8 flex justify-center">

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-black w-full max-w-xl px-5 py-3 rounded-lg outline-none"
            />

          </div>

        </div>

      </div>

      {/* Products */}

      <div className="max-w-7xl mx-auto px-5 py-12">

        <h2 className="text-3xl font-bold mb-8">
          Latest Products
        </h2>

        {loading ? (
          <div className="text-center text-2xl font-semibold">
            Loading...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-2xl font-semibold">
            No Product Found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Home;