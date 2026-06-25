// main.jsx - The entry point of our React application.
// This file connects our React app to the real HTML page (index.html).

// Import React's DOM renderer — this is what "mounts" our React app.
import ReactDOM from "react-dom/client";

// Import our root App component.
import App from "./App.jsx";

// ReactDOM.createRoot() finds the <div id="root"> in index.html
// and takes over that div to render our React app inside it.
// document.getElementById("root") is just a standard DOM method.
ReactDOM.createRoot(document.getElementById("root")).render(
  // <App /> renders our entire application.
  // React.StrictMode would be another wrapper option, but we keep it simple.
  <App />
);
