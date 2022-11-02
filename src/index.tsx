import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/index.css';


import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import TemplateIndex from './views/index/Template';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateIndex />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as any);

root.render(
  <React.Fragment>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.Fragment>
);