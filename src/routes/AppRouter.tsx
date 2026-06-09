import {
    createBrowserRouter,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

import WorkspacePage from "@/pages/workspace/WorkspacePage";
import DocumentPreviewPage from "@/pages/documents/DocumentPreviewPage";

export const router =
    createBrowserRouter([
        {
            element: <PublicRoute />,
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/register",
                    element: <RegisterPage />,
                },
            ],
        },

        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <WorkspacePage />,
                },
                {
                    path: "/chat/:chatId",
                    element: <WorkspacePage />,
                },
                {
                    path: "/documents/:documentId",
                    element: <DocumentPreviewPage />,
                }
            ],
        },
    ]);