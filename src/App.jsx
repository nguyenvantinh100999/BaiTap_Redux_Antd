// src/App.js
import React from "react";
import CryptoPortfolio from "./components/CryptoPortfolio";
import "antd/dist/reset.css"; // Import Ant Design styles
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<CryptoPortfolio />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
