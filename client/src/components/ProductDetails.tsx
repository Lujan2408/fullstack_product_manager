import { type Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <tr className="border-b border-slate-300 font-medium">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">{product.available ? 'Available' : 'No Available'}</td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center justify-center"> 
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-blue-500 uppercase">Edit</button>
        </div>
      </td>
    </tr>
  );
}
