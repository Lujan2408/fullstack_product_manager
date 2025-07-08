/* eslint-disable react-refresh/only-export-components */
import { Link, Form, useActionData, redirect, useLoaderData } from "react-router-dom"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";

const availabilityOptions = [
  { name: 'Available', value: true},
  { name: 'Unavailable', value: false}
]

export async function loader({params} : LoaderFunctionArgs) {
  const { id } = params
  
  if (id !== undefined) {
    const product = await getProductById(+id)
  
    if (!product) {
      return redirect('/')
    }

    return { product }
  }
} 

export async function action({ request, params } : ActionFunctionArgs) {
  
  const data = Object.fromEntries(await request.formData());
  let error = ''
  
  if (Object.values(data).includes('')) {
    error = 'All fields are required'
  }
  if (error.length) {
    return error
  }
  
  if(params.id !== undefined) {    
    await updateProduct(+params.id, data)
    return redirect('/')
  }
}

export default function EditProduct() {

  const { product } = useLoaderData() as { product: Product }
  const error = useActionData() as string
 
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Edit Product</h1>
        <Link
          to="/"
          className="bg-indigo-600 text-white p-3 rounded-md font-medium shadow-sm hover:bg-indigo-500"
        >
          Back to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Name"
            name="name"
            defaultValue={product.name}
          />
        </div>
        
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Product Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Price. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.available.toString()}
          >
            {availabilityOptions.map((option) => (
              <option 
                key={option.name} 
                value={option.value.toString()}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Edit Product"
        />
      </Form>
    </>
  );
}
