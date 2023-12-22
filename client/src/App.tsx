import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import Home from "./pages/home";
import Create from "./pages/create";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundry from "./errorBoundary/ErrorBoundry";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundry>
        <Layout />
      </ErrorBoundry>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/create", element: <Create /> },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundry>
      <StyledEngineProvider injectFirst>
        {/* Your component tree. Now you can override Material UI's styles. */}
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </ErrorBoundry>
  );
}

export default App;
