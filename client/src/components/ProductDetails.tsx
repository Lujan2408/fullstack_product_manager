import { useNavigate, type ActionFunctionArgs, redirect } from "react-router"
import { type Product } from "../types"
import { formatCurrency } from "../utils"
import { Form } from "react-router-dom"

type ProductDetailsProps = {
  product: Product
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params } : ActionFunctionArgs) {
  console.log("Desde action product details", params.id)

  return redirect('/')
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  
  const navigate = useNavigate()
  
  return (
    <tr className="border-b border-slate-300 font-medium">
      <td className="p-3 text-lg text-gray-800">{product.id}</td>
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">{product.available ? 'Available' : 'Unavailable'}</td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center justify-center"> 
          <button 
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-indigo-600 text-white p-2 rounded-lg text-xs cursor-pointer w-full hover:bg-indigo-500 uppercase"
          >Edit</button>
        

          <Form 
            className="w-full"
            method="DELETE"
            action={`products/${product.id}/delete`}
          >
            <button
              type="submit"
              className="bg-red-600 text-white p-2 rounded-lg text-xs cursor-pointer w-full hover:bg-red-500 uppercase"
            >
              Delete
            </button>
          </Form>
        </div>
      </td> 
    </tr>
  );
}
