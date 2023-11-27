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
import PetDetails from "../pages/PetDetails/PetDetails";
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import PetPageCategory from "../pages/PetPageCategory/PetPageCategory";
import TestInfiniteScroll from "../pages/TestInfiniteScroll/TestInfiniteScroll";
import CreateDonation from "../pages/Dashboard/CreateDonation/CreateDonation";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";
import UpdateDonation from "../pages/Dashboard/UpdateDonation/UpdateDonation";

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
        element: <PetListing></PetListing>,
      },
      {
        path: "/test",
        element: <TestInfiniteScroll></TestInfiniteScroll>,
      },
      {
        path: "/category/:name",
        element: <PetPageCategory></PetPageCategory>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.name}`),
      },
      {
        path: "/pet/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/pets/${params.id}`),
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
          //TODO: wrap with admin route
          {
            path: "home",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "allUsers",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "allDonations",
            element: <AllDonations></AllDonations>,
          },
          {
            path: "updateDonation/:id",
            element: <UpdateDonation></UpdateDonation>,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/donations/${params.id}`),
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
          {
            path: "adoptionRequest",
            element: <AdoptionRequest></AdoptionRequest>,
          },
          {
            path: "createDonation",
            element: <CreateDonation></CreateDonation>,
          },
        ],
      },
    ],
  },
]);

export default router;
