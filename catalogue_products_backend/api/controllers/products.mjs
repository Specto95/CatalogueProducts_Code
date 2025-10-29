import {
  validateDeleteProductSchema,
  validatePartialProductSchema,
  validateProductSchema,
} from "./validations/productValidations.mjs";

export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  getAll = async (_, res) => {
    const products = await this.productModel.getAll();
    res.status(200).json({ data: products });
  };

  create = async (req, res) => {
    const result = validateProductSchema(req.body);
    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const newProduct = await this.productModel.create({ input: result.data });
    res.status(201).json({ data: newProduct });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialProductSchema(req.body);
    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const updated = await this.productModel.update({ id, input: result.data });
    res.status(200).json({ data: updated });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = validateDeleteProductSchema({ id });
    if (!result.success) {
      return res.status(422).json({
        message: JSON.parse(result.error.message),
        errors: result.error.errors,
      });
    }

    const deleted = await this.productModel.delete({ id });
    res.status(200).json({ data: deleted });
  };
}
