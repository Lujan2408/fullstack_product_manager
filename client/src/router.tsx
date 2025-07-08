import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import { loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";

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