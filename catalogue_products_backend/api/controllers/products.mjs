import { ProductModel } from "../models/product.mjs";
import {
  validateDeleteProductSchema,
  validatePartialProductSchema,
  validateProductSchema,
} from "./validations/productValidations.mjs";

export class ProductController {
  static async getAll(_, res) {
    const products = await ProductModel.getAll();
    res.status(200).json({
      data: products,
    });
  }

  static async create(req, res) {
    const result = validateProductSchema(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const newProduct = await ProductModel.create({ input: result.data });
    res.status(201).json({ data: newProduct });
  }

  static async update(req, res) {
    const { id } = req.params;

    const result = validatePartialProductSchema(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const updateProduct = await ProductModel.update({
      id,
      input: result.data,
    });

    res.status(201).json({
      data: updateProduct,
    });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = validateDeleteProductSchema({ id });

    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const deleteProduct = await ProductModel.delete({ id });
    res.status(200).json({ data: deleteProduct });
  }
}
