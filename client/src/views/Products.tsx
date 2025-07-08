import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const products = await getProducts()
  console.log(products)

  return {}
}

export default function Products() {
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
    </>
  )
}
