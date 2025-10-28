export class ProductModel {
  static async getAll() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  }

  static async create({ input }) {
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({input}),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async update({id, input}) {

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({input}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete({id}) {

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
