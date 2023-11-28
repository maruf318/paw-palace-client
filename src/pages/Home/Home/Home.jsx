import Banner from "../../../components/Banner/Banner";
import AboutUs from "../AboutUs/AboutUs";
import CallToAction from "../CallToAction/CallToAction";
import Faq from "../Faq.jsx/Faq";
import PetsCategory from "../PetsCategory/PetsCategory";
import Subscribe from "../Subscribe/Subscribe";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PetsCategory></PetsCategory>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      <Faq></Faq>
      <Subscribe></Subscribe>
      {/* TODO: two more sections here */}
    </div>
  );
};

export default Home;
