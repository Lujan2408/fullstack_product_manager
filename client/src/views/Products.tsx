import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { type Product } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const products = await getProducts()
  return products
}

export default function Products() {
  
  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Products</h1>
        <Link
          to="/products/new"
          className="bg-indigo-600 text-white p-3 rounded-md font-medium shadow-sm hover:bg-indigo-500"
        >
          New Product
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map(product => (
              <ProductDetails 
                key={product.id}
                product={product}
              /> 
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
