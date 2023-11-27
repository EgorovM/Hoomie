import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(root)

root.render(
    <RouterProvider router={router}/>
);
