import type { useMutation } from "@apollo/client/react";
import type { Product } from "../interfaces/api/Products";
import type { ApolloCache } from "@apollo/client";

export const handleDelete = async (
  product: Product,
  deleteProduct: useMutation.MutationFunction<
    unknown,
    {
      [x: string]: unknown;
    },
    ApolloCache
  >
) => {
  const confirmed = confirm(
    `¿Estás seguro de eliminar el producto "${product.title}"?`
  );
  if (!confirmed) return;

  try {
    await deleteProduct();
  } catch (err) {
    console.error(err);
    alert("Error eliminando el producto.");
  }
};