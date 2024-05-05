// // Importing firebase 
// Ignoring warning below..
// eslint-disable-next-line
import { app } from "./config/firebase-config";

import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Route";

function App() {
  return (
    <RouterProvider router={Router} />
  )
}

export default App;
