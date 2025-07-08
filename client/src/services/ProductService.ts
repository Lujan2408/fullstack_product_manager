import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema } from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    })
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/v1/products/`
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      })
    } else {
      throw new Error("Error al crear el producto", { cause: result.issues })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/products/`
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data)
    
    if (result.success) {
      return result.output
    } else {
      throw new Error("Error al obtener los productos", { cause: result.issues })
    }
  } catch (error) {
    console.log(error)
  }
}
