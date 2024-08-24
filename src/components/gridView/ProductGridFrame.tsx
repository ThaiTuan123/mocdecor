import React, {useEffect, useState} from "react";
import {Product} from "@/types/product";
import {fetchProducts} from "@/services/fetchProducts";
import ProductCardWhite from "@/components/product/ProductCardWhite";
import SolidButton from "@/components/button/SolidButton";
import languages from "@/configs/languages";

const ProductGridFrame: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
        };
        loadProducts();
    }, []);
    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCardWhite key={product.id} {...product} />
                ))}

            </div>
            <div className="flex justify-center my-10">
                <SolidButton text={languages.get('button.viewMore')} href="/your-target-page"/>
            </div>
        </div>
    );
};

export default ProductGridFrame;