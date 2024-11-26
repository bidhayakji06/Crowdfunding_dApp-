import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import './index.css';
import { StateContextProvider } from "./context";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <ThirdwebProvider
      clientId='d59cc1a494f7e81044262c8d5eceefe9'
      activeChain={Sepolia}
    >
      <StateContextProvider>
      <App />
      </StateContextProvider>
    </ThirdwebProvider>
  </>
);
