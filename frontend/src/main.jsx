import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import Forget from "./Pages/Forget.jsx";
import ForgetVerify from "./Pages/ForgetVerify.jsx";
import EmailVerififcationPage from "./Pages/EmailVerififcationPage.jsx";
import ProtectedRoute from "./middleware/protectedRoute.jsx";
import ChatApp from "./Pages/ChatApp.jsx";
import HomePage from "./Pages/HomePage.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Post from "./Pages/Post.jsx";
import Project from "./Pages/Project.jsx"
import MyAccount from "./Pages/MyAccount.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
     
    ],
  },
  {
    path: "/addProject",
    element: <Post />,
  },
  {
    path: "/login",
    element: <ProtectedRoute children={<Login />} to={"/"} />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/myprofile",
    element: <MyAccount />,
  },
  
  {
    path: "/forget",
    element: <Forget />,
  },
  {
    path: "/forget/:id/verify",
    element: <ForgetVerify></ForgetVerify>,
  },
  {
    path:"/verifyEmail/:id",
    element:<EmailVerififcationPage/>
  },
  {
    path: '/projects',
    element: <Project/>
  },
  {
    path: '/contact',
    element: <ContactUs/>
  },
  {
    path: "chat",
    loader: async () => {
      try {
        return axios.get("http://localhost:8000/api/chat/getAllGroups", {
          withCredentials: true,
        });
      } catch (error) {
        return error;
      }
    },
    element: <ChatApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
