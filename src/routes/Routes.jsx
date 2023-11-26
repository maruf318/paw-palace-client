import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PetListing from "../pages/PetListing/PetListing";
import PrivateRoute from "./PrivateRoute";
import DashBoardHome from "../pages/Dashboard/DashBoardHome/DashBoardHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyAddedPets from "../pages/Dashboard/MyAddedPets/MyAddedPets";
import AllPets from "../pages/Dashboard/AllPets/AllPets";
import UpdatePet from "../pages/Dashboard/UpdatePet/UpdatePet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/petListing",
        element: (
          <PrivateRoute>
            <PetListing></PetListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoardHome></DashBoardHome>
          </PrivateRoute>
        ),
        children: [
          //admin routes
          {
            path: "home",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "allUsers",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "allPets",
            element: <AllPets></AllPets>,
          },
          {
            path: "allPets/:id",
            element: <UpdatePet></UpdatePet>,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/pets/${params.id}`),
          },
          //user routes
          {
            path: "addPet",
            element: <AddPet></AddPet>,
          },
          {
            path: "myAddedPets",
            element: <MyAddedPets></MyAddedPets>,
          },
        ],
      },
    ],
  },
]);

export default router;
