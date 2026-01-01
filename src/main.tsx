import "./index.css"

import { RouterProvider } from "react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { router } from "./router/app.router"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
