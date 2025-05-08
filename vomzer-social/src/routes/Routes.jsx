import React from 'react';
import Layout from '../components/layout/Layout';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import WalletProfile from '../pages/profile/WalletProfile';



export const ROUTES = [
    {
      path: '/',
      element: <Layout />,
  },
  {
    path: '/register',
    element: <Register />,
},
{
  path: '/login',
  element: <Login />,
},
{
  path: '/profile',
  element: <WalletProfile />,
},
]