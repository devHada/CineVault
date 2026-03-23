import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <WatchlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WatchlistProvider>
  </ThemeProvider>,
);
