import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { HelmetProvider } from "react-helmet-async";
import "./style/main.scss";


function App() {
  return (<HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
  );
}

export default App;