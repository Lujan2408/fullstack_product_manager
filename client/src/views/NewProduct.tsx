import { Link, Form, useActionData, redirect } from "react-router-dom"
import type { ActionFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request } : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = ''
  if (Object.values(data).includes('')) {
    error = 'All fields are required'
  }
  if (error.length) {
    return error
  }

  await addProduct(data)

  return redirect('/')
}

export default function NewProduct() {
  
  const error = useActionData() as string
 
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Add New Product</h1>
        <Link
          to="/"
          className="bg-indigo-600 text-white p-3 rounded-md font-medium shadow-sm hover:bg-indigo-500"
        >
          Back to Products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form 
        className="mt-10"
        method="POST"
      >
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Add Product"
        />
      </Form>
    </>
  );
}
