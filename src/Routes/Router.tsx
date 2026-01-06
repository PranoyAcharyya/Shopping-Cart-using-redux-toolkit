import { createBrowserRouter } from "react-router-dom";

import Products from "../components/Products";
import Cart from "../pages/Cart";
import GlobalWrapper from "../Layout/GlobalWrapper";

export const Router = createBrowserRouter([
    {
        path:"/",
        element:<GlobalWrapper/>,
        children:[
            {
                index:true,
                element:<Products/>
            },{
                path:"/cart",
                element:<Cart/>
            }
        ]
    }  
])