import { useEffect, useState } from "react";
import { fetchItems } from "./api/fetchItems";
import { transformItems, type UiProduct } from "./api/transformItems";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState<UiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchItems();
        const transformed = transformItems(data);
        setProducts(transformed.products);
        setGroupName(transformed.groupName);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const sortedProducts =
  sortOrder === "default"
    ? products
    : [...products].sort((a, b) =>
        sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price
      );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-white px-8 py-10">
    <div className="max-w-6xl mx-auto">

      {/* Header row */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-semibold tracking-tight text-[#4D4D4D]">
          {groupName || "Izdelki"}
        </h1>

        {/* filter */}
        <div className="relative">
  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(e.target.value as "default" | "asc" | "desc")
    }
    className="
      bg-white
      border
      border-gray-300
      rounded-md
      text-[14px]
      font-medium
      text-[#4D4D4D]
      px-2
      py-2
      pr-8
      focus:outline-none
      focus:ring-1
      focus:ring-blue-400
      cursor-pointer
    "
  >
    <option value="default">Cena</option>
    <option value="asc">Naraščujoče</option>
    <option value="desc">Padajoče</option>
  </select>

</div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
  <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-[#4D4D4D]">
    Ni najdenih artiklov za izbrano skupino.
  </div>
) : (
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {sortedProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}

    </div>
  </div>
);
}

export default App;