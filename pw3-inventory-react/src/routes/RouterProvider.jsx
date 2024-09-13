import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import RegisterProducts from "../components/pages/CardProducts";
import ListProducts from "../components/pages/ListProducts";
import Home from "../components/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
            
                <NavBar/>
                <Home/>
            
            </>
        ),
    },
    {
        path: "register",
        element: (
            <>
            
                <NavBar/>
                <RegisterProducts/>
            
            </>
        ),
    },
    {
        path: "list",
        element: (
            <>
            
                <NavBar/>
                <ListProducts/>
            
            </>
        ),
    },
]) 

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;