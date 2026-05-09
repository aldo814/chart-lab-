import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style/main.scss";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
      mirror: false,
      disableMutationObserver: false,
    });
  }, []);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
