import { lazy } from "react";
import "./App.css";

import Navbar from "./components/CatalogueProducts/Navbar/Navbar";
import { LIST_PRODUCTS } from "./api/query/listProducts";
import { useQuery } from "@apollo/client/react";
import type { Products } from "./components/CatalogueProducts/interfaces/api/Products";


const CatalogueProductsView = lazy(() =>
  import("./components/CatalogueProducts/CatalogueProductsView").then(
    (module) => ({
      default: module.CatalogueProductsView,
    })
  )
);

function App() {
  const {
    data: productsData,
  } = useQuery<{ listProducts: Products }, Record<string, Products>>(
    LIST_PRODUCTS
  );

  return (
    <>
      <Navbar />
      <main className="main">
        <CatalogueProductsView
          products={productsData ? productsData.listProducts.products : []}
          // setProductsData={setProductsData}
        />
      </main>
    </>
  );
}

export default App;
