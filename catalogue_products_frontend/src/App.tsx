import { lazy } from "react";
import "./App.css";

import {Navbar} from "./components/CatalogueProducts/Navbar/Navbar";

const CatalogueProductsView = lazy(() =>
  import("./components/CatalogueProducts/CatalogueProductsView").then(
    (module) => ({
      default: module.CatalogueProductsView,
    })
  )
);

function App() {

  return (
    <>
      <Navbar />
      <main className="main">
        <CatalogueProductsView
        />
      </main>
    </>
  );
}

export default App;
