import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './Components/ErrorPage';
import { AppLayout } from './Components/AppLayout';
import { ChatApp } from './pages/ChatMessages/ChatApp';
import UsersChat from './pages/ChatMessages/UsersChat';
import HomeLayout from './HomeComponent.jsx/ChatPages.jsx/HomeLayout';
import { Signup } from './Logion&Signup/Signup';
import { Login } from './Logion&Signup/Login';
import { PrivateRoute, PublicRoute } from './Logion&Signup/Private&PublicRoutes';
import ForgotPassword from './Logion&Signup/ForgotPassword';
import VerifyOTP from './Logion&Signup/VerifyOTP';
import SetNewPassword from './Logion&Signup/SetNewPassword';
import CallsHome from './pages/ChatCalls/CallsHome';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true,  element: <PublicRoute><Signup/></PublicRoute> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
      { path: "/verify-otp", element: <PublicRoute><VerifyOTP /></PublicRoute> },
      { path: "/set-new-password", element: <PublicRoute><SetNewPassword /></PublicRoute> }
    ]
  },
  {
    path: "/profile",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {path: "/profile", element: <PrivateRoute><ChatApp /></PrivateRoute>},
      {path: "/profile/userschat/:id", element: <PrivateRoute><UsersChat /></PrivateRoute>},
      { path: "/profile/calls", element: <PrivateRoute><CallsHome /></PrivateRoute> }
    ]
  }
])

const App = () => {
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`${import.meta.env.VITE_BACKEND_API_URL}`, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      } 
    }

  }, [authUser]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App