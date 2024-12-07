import React, {useEffect} from "react";
import {fetchProducts} from "@/services/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import OutlineButton from "@/components/button/OutlineButton";
import languages from "@/configs/languages";
import {useRecoilState} from "recoil";
import {productState, selectedProductState} from "@/recoil/atoms/productAtom";
import {Product} from "@/types/product";
import ProductPopup from "@/components/popup/ProductPopup";

const ProductGrid: React.FC<{ category: string; subCategory: string }> = ({
                                                                            category,
                                                                            subCategory,
                                                                          }) => {
  const [products, setProducts] = useRecoilState(productState);
  const [selectedProduct, setSelectedProduct] = useRecoilState<Product | null>(selectedProductState); // Manage selected product

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts({category, subCategory});
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

  const showViewMoreButton = Array.isArray(products) && products.length > 0;

  return (
      <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {showViewMoreButton ? (
                  products.map((product, index) => (
                      <ProductCard
                          key={`${product.product_id}-${index}`}
                          {...product}
                          onClick={() => handleProductClick(product)}
                      />
                  ))
              ) : (
                  <div className="col-span-2 md:col-span-3 lg:col-span-4">
                      <h1 className='text-xl '>
                          Chúng tôi đang trong quá trình cập nhật sản phẩm {subCategory}. Nếu cần, có thể liên hệ trực
                          tiếp với chúng tôi.
                      </h1>
                  </div>
              )}
          </div>

          {/* Conditionally render the "view more" button */}
          {showViewMoreButton && (
              <div className="flex justify-center my-6 md:my-10">
                  <OutlineButton
                      text={languages.get("button.viewMore")}
                      href="/your-target-page"
                  />
              </div>
          )}

          {/* Show the popup if a product is selected */}
          {selectedProduct && (
              <ProductPopup product={selectedProduct} onClose={handleClosePopup}/>
          )}
      </div>
  );
};

export default ProductGrid;