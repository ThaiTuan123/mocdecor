import React, {useEffect, useState} from "react";
import {fetchProducts} from "@/services/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import OutlineButton from "@/components/button/OutlineButton";
import languages from "@/configs/languages";
import {useRecoilState} from "recoil";
import {productState} from "@/recoil/atoms/productAtom";
import {Product} from "@/types/product";
import ProductPopup from "@/components/popup/ProductPopup";

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useRecoilState(productState);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for the selected product

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        };
        loadProducts();
    }, [setProducts]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            console.log("Added to cart:", selectedProduct);
            handleClosePopup();
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        onClick={() => handleProductClick(product)} // Handle product click
                    />
                ))}
            </div>
            <div className="flex justify-center my-10">
                <OutlineButton text={languages.get('button.viewMore')} href="/your-target-page"/>
            </div>

            {/* Show the popup if a product is selected */}
            {selectedProduct && (
                <ProductPopup
                    product={selectedProduct}
                    onClose={handleClosePopup}
                    onAddToCart={handleAddToCart}/>
            )}
        </div>
    );
};

export default ProductGrid;