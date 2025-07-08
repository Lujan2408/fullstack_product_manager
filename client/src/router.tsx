import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import { loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/:id/edit", // ROA pattern - Resource Oriented Architecture
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      }
    ]
  }
],
  {
    future: {
      // @ts-expect-error: This flag exists but it not typed yet
      v7_startTransition: true,
    }
  }
)