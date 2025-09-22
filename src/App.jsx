import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./component/dashboard";
import ManageBike from "./pages/bike";
import ManageCategory from "./pages/category";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "bike",
          element: <ManageBike />, //outlet
        },
        {
          path: "category",
          element: <ManageCategory />, //outlet
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}

export default App;
