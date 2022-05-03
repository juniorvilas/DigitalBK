import React from "react";
import AppRoutes from "./routes/AppRoutes";
import UserProvider from "./context/user";
import FilterProvider from "./context/filter";
import ProductsProvider from "./context/products";



function App() {
  return (
    <UserProvider>
      <FilterProvider>
        <ProductsProvider>
          <AppRoutes />
        </ProductsProvider>
      </FilterProvider>
    </UserProvider>
  );
}


export default App;
