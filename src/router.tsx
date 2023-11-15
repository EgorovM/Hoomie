import {createBrowserRouter} from "react-router-dom";
import Item from "./pages/item";
import Menu from "./pages/menu";
import Layout from "./layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: 'menu/:id',
        element: <Item/>
      }
    ]
  }
]);
