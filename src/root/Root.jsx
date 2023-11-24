import Navbar from "../components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
