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

import CreateDonation from "../pages/Dashboard/CreateDonation/CreateDonation";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";
import UpdateDonation from "../pages/Dashboard/UpdateDonation/UpdateDonation";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import MyDonationCampaign from "../pages/Dashboard/MyDonationCampaign/MyDonationCampaign";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,

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
        path: "/donationCampaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/donationCampaign/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://paw-palace-server.vercel.app/donations/${params.id}`),
      },
      // {
      //   path: "/test",
      //   element: <TestInfiniteScroll></TestInfiniteScroll>,
      // },
      {
        path: "/category/:name",
        element: <PetPageCategory></PetPageCategory>,
        loader: ({ params }) =>
          fetch(`https://paw-palace-server.vercel.app/category/${params.name}`),
      },
      {
        path: "/pet/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://paw-palace-server.vercel.app/pets/${params.id}`),
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
              fetch(
                `https://paw-palace-server.vercel.app/donations/${params.id}`
              ),
          },
          {
            path: "allPets",
            element: <AllPets></AllPets>,
          },
          {
            path: "allPets/:id",
            element: <UpdatePet></UpdatePet>,
            loader: ({ params }) =>
              fetch(`https://paw-palace-server.vercel.app/pets/${params.id}`),
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
          {
            path: "myDonations",
            element: <MyDonations></MyDonations>,
          },
          {
            path: "myDonationCampaign",
            element: <MyDonationCampaign></MyDonationCampaign>,
          },
        ],
      },
    ],
  },
]);

export default router;
