import {
  FaAd,
  FaBook,
  FaCat,
  FaDog,
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

const DashBoardHome = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn w-1/4  btn-primary drawer-button lg:hidden"
          >
            Open
            <TiThMenuOutline />
          </label>
          <div className=" p-8">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* {isAdmin ? ( */}
            {/* <> */}
            {isAdmin && (
              <>
                <li>
                  <NavLink to={"/dashboard/allDonations"}>
                    <FaBook></FaBook> All Donations
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/allUsers"}>
                    <FaUsers></FaUsers> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/allPets"}>
                    <FaCat></FaCat> All Pets
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            {/* </> */}
            {/* ) : (
            <> */}
            <li>
              <NavLink to={"/dashboard/home"}>
                <FaHome></FaHome>Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/addPet"}>
                <FaCat></FaCat> Add a pet
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/myAddedPets"}>
                <FaDog></FaDog> My added pets
              </NavLink>
            </li>

            <li>
              <NavLink to={"/dashboard/adoptionRequest"}>
                <FaSearch></FaSearch> Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/createDonation"}>
                <FaAd></FaAd>Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/myDonationCampaign"}>
                <FaShoppingCart></FaShoppingCart> My Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/myDonations"}>
                <FaShoppingCart></FaShoppingCart> My Donations
                {/* ({cart.length}) */}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={"/dashboard/paymentHistory"}>
                <FaList></FaList> Payment History
              </NavLink>
            </li> */}
            {/* </>
          )} */}
            {/* shared navlinks */}
            <div className="divider"></div>
            {/* <li>
              <NavLink to={"/"}>
                <FaHome></FaHome>Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/order/salad"}>
                <FaSearch></FaSearch>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to={"/order/contact"}>
                <FaEnvelope></FaEnvelope>
                Contact
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
      {/*  */}

      {/* ); */}
    </div>
  );
};

export default DashBoardHome;
