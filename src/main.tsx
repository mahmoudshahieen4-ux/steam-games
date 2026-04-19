import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./styles/index.css";

// Performance and accessibility improvements
if (typeof window !== "undefined") {
  // Preload critical resources
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = "/src/assets/logo.png";
  link.as = "image";
  document.head.appendChild(link);

  // Add meta tags for better SEO and performance
  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content =
    "width=device-width, initial-scale=1, shrink-to-fit=no";
  document.head.appendChild(metaViewport);

  // Add theme color for mobile browsers
  const metaThemeColor = document.createElement("meta");
  metaThemeColor.name = "theme-color";
  metaThemeColor.content = "#000000";
  document.head.appendChild(metaThemeColor);

  // Add preload for fonts if any
  // const fontLink = document.createElement('link');
  // fontLink.rel = 'preload';
  // fontLink.href = '/fonts/inter.woff2';
  // fontLink.as = 'font';
  // fontLink.type = 'font/woff2';
  // fontLink.crossOrigin = 'anonymous';
  // document.head.appendChild(fontLink);
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// Register service worker for PWA functionality
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
