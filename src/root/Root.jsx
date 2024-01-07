import Navbar from "../components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";

const Root = () => {
  return (
    <div className="bg-gradient-to-b from-cyan-100 to-rose-100">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
