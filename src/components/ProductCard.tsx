import type { UiProduct } from "../api/transformItems";

interface ProductCardProps {
  product: UiProduct;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col">
      
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-square object-contain bg-gray-50 rounded-lg mb-4"
        />
      )}

      {/* Title */}
      <h2 className="font-semibold text-lg leading-snug line-clamp-2 min-h-14">
        {product.name}
      </h2>

      {/* Price */}
      <p className="mt-auto text-[#4D4D4D] font-bold text-lg pt-4">
        {product.price.toLocaleString("sl-SI", {
          style: "currency",
          currency: "EUR",
        })}
      </p>

      {/* Out of Stock badge */}
      {product.stock === 0 && (
        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Ni na zalogi
        </span>
      )}
    </div>
  );
}

export default ProductCard;