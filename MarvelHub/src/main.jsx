import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostProvider } from "./pages/PostContext";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <PostProvider>
          <App />
        </PostProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Ensure 'root' exists in your HTML.");
}
