import { object, string, number, boolean, type InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
})

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  available: boolean(),
  created_at: string(),
  updated_at: string(),
})

export const UpdateProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  available: boolean(),
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>