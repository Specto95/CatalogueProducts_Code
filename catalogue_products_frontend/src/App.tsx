import { useEffect, useState, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const CatalogueProductsView = lazy(() =>
  import("./components/CatalogueProducts/CatalogueProductsView").then(
    (module) => ({
      default: module.CatalogueProductsView,
    })
  )
);

const DUMNMYAPI = "https://dummyjson.com/products";

function App() {
  const [data, setData] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(DUMNMYAPI);
      const res = await data.json();
      setData(res.results);
      console.log(res);
    }

    fetchData();
  }, []);

  return (
    <>
      <main className="main">
        <CatalogueProductsView />
      </main>
    </>
  );
}

export default App;
