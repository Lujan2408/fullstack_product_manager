import { Link } from "react-router-dom";

export default function NewProduct() {
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
    </>
  );
}
