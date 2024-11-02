import { createBrowserRouter } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NotesPage />
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },
]);

export default router;