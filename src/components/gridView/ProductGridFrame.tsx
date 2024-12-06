import React, {useEffect, useState} from "react";
import {Product} from "@/types/product";
import {fetchProducts} from "@/services/fetchProducts";
import ProductCardWhite from "@/components/product/ProductCardWhite";
import SolidButton from "@/components/button/SolidButton";
import languages from "@/configs/languages";
import ProductPopup from "@/components/popup/ProductPopup";

const ProductGridFrame: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for the selected product

    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, [setProducts]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCardWhite
            key={product.product_id}
            {...product}
            onClick={() => handleProductClick(product)} // Handle product click
          />
        ))}
      </div>
      <div className="flex justify-center my-6 md:my-10">
        <SolidButton
          text={languages.get("button.viewMore")}
          href="/your-target-page"
        />
      </div>

            {/* Show the popup if a product is selected */}
            {selectedProduct && (
                <ProductPopup
                    product={selectedProduct}
                    onClose={handleClosePopup}/>
            )}
        </div>
    );
};

export default ProductGridFrame;
