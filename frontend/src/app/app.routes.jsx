import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register"

import Protected from "../features/auth/components/Protected";
import EmailVerificationModal from "../features/auth/components/EmailVerificationModal";
import Dashboard from "../features/Chat/pages/Dashboard";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Protected><Dashboard /></Protected>
    },
    
    {
        path:'/login',
        element:<Login />
    },
     {
        path:'/register',
        element:<Register />
    },{
        path:'/verify-email',
        element:<EmailVerificationModal />
    },{
        path:"*",
        element: <Protected><Dashboard /></Protected>
    }
])