import React, {useEffect, useState} from "react";
import {fetchProducts} from "@/services/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import OutlineButton from "@/components/button/OutlineButton";
import languages from "@/configs/languages";
import { useRecoilState } from "recoil";
import { productState } from "@/recoil/atoms/productAtom";
import { Product } from "@/types/product";
import ProductPopup from "@/components/popup/ProductPopup";

const ProductGrid: React.FC<{ category: string; subCategory: string }> = ({
  category,
  subCategory,
}) => {
  const [products, setProducts] = useRecoilState(productState);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts({ category, subCategory });
        // Reset products with new data instead of appending
        setProducts([...productsData]);
      } catch (error) {
        console.log(error);
        console.error("Failed to load products:", error);
      }
    };
    // Clear existing products before loading new ones
    setProducts([]);
    loadProducts();
  }, [category, subCategory, setProducts]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              key={`${product.product_id}-${index}`}
              {...product}
              onClick={() => handleProductClick(product)}
            />
          ))
        ) : (
          <div>No products found {subCategory}</div>
        )}
      </div>
      <div className="flex justify-center my-6 md:my-10">
        <OutlineButton
          text={languages.get("button.viewMore")}
          href="/your-target-page"
        />
      </div>

      {/* Show the popup if a product is selected */}
      {selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ProductGrid;