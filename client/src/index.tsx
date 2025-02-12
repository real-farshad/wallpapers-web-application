import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./contexts";
import App from "./App";

const root = createRoot(document.getElementById("root")!!);
root.render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
