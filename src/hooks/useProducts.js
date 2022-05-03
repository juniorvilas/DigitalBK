import { useContext } from "react";
import { ProductsContext } from '../context/products';


export const useProducts = () => {
    const context = useContext(ProductsContext);
    const { products, setProducts } = context;
    return { products, setProducts }
}