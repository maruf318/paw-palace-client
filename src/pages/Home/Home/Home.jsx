import Banner from "../../../components/Banner/Banner";
import AboutUs from "../AboutUs/AboutUs";
import CallToAction from "../CallToAction/CallToAction";
import PetsCategory from "../PetsCategory/PetsCategory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PetsCategory></PetsCategory>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      {/* TODO: two more sections here */}
    </div>
  );
};

export default Home;
