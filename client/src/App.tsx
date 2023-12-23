import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import Home from "./pages/home";
import CreateNote from "./pages/createNote";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundry from "./errorBoundary/ErrorBoundry";
import Note from "./pages/note";
import EditNote from "./pages/editNote";

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
      { path: "/create", element: <CreateNote /> },
      { path: "/notes/:noteId", element: <Note /> },
      { path: "/editnote/:noteId", element: <EditNote /> },
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
