import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register"
import Chat from "../features/Chat/Chat";
import Protected from "../features/auth/components/Protected";
import EmailVerificationModal from "../features/auth/components/EmailVerificationModal";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Protected><Chat /></Protected>
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
    }
])