import { safeParse, pipe, transform, string, number, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, UpdateProductSchema, type Product } from "../types";
import { apiUrl } from "../helpers/api";

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
      const url = apiUrl("api/v1/products/")
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
    const url = apiUrl("api/v1/products/")
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
    const url = apiUrl(`api/v1/products/${id}`)
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
      const isAvailable = data.availability === "on" || data.availability === "true"

      const result = safeParse(UpdateProductSchema, {
        id, 
        name: data.name,
        price: parse(NumberSchema, data.price),
        available: isAvailable
      })

      if(result.success) {
        const url = apiUrl(`api/v1/products/${id}`)
        await axios.patch(url, result.output)
      } else {
        throw new Error("Error al actualizar el producto", { cause: result.issues })
      }
    } catch (error) {
      console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
  try { 
    const url = apiUrl(`api/v1/products/${id}`)
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}

export async function updateAvailability(id: Product['id']) {
  try {
    const url = apiUrl(`api/v1/products/${id}/availability`)
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}