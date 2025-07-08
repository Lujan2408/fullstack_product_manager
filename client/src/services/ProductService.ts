import { safeParse, pipe, transform, string, number, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, UpdateProductSchema, type Product } from "../types";
import { toBoolean } from "../utils";

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

export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/products/${id}`
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data)

    if (result.success) {
      return result.output
    } else {
      throw new Error("Error al obtener los productos", { cause: result.issues })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function updateProduct(id: Product['id'], data: ProductData) {
    try {
      const NumberSchema = pipe(string(), transform(Number), number())

      const result = safeParse(UpdateProductSchema, {
        id, 
        name: data.name,
        price: parse(NumberSchema, data.price),
        available: data.available ? toBoolean(data.available.toString()) : false
      })

      if(result.success) {
        
      }
    } catch (error) {
      console.log(error)
    }
}