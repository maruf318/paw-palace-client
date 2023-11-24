import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <div className="about-bg h-[550px] bg-fixed bg-contain flex items-center justify-center">
      <div className="h-2/3 w-5/6 bg-white  mx-auto py-24">
        <SectionTitle heading={"About Us"}></SectionTitle>
        <p className="text-center text-sm md:text-lg md:px-40 bg-white px-4 pt-10">
          Welcome to Paw Palace! Our platform simplifies the pet adoption
          process, creating a seamless journey for animals in need. Users can
          submit adoption requests for their beloved pets, connecting them with
          caring individuals ready to provide a forever home. Simultaneously,
          our ongoing campaigns allow users to contribute to the well-being of
          these animals by making donations. Join us in fostering a community
          where every pet finds love, and every contribution makes a significant
          impact on their lives.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
