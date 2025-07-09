import { useNavigate, type ActionFunctionArgs, redirect } from "react-router"
import { type Product } from "../types"
import { formatCurrency } from "../utils"
import { Form, useFetcher } from "react-router-dom"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params } : ActionFunctionArgs) {

  if(params.id) {
    await deleteProduct(+params.id)
    return redirect('/')
  }

}

export default function ProductDetails({ product }: ProductDetailsProps) {
  
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const isAvailable = product.available

  return (
    <tr className="border-b border-slate-300 font-medium">
      <td className="p-3 text-lg text-gray-800">{product.id}</td>
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button 
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? ' text-green-600' : ' text-red-600'} rounded-lg text-xs cursor-pointer w-full uppercase border border-gray-300 p-2`}
          >
            {isAvailable ? 'Available' : 'Unavailable'}
          </button>
        </fetcher.Form>
      </td>
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
            onSubmit={(e) => {
              if(!confirm('Are you sure you want to delete this product?')) {
                e.preventDefault()
              }
            }}
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
