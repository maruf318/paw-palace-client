import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <div className="about-bg h-[550px] bg-fixed bg-contain flex items-center justify-center">
      <div className="h-2/3 w-5/6 bg-white  mx-auto py-24">
        <SectionTitle heading={"About Us"}></SectionTitle>
        <p className="text-center text-sm md:text-lg md:px-40 bg-white px-4 pt-10">
          At Paw Palace, we are passionate about connecting hearts and paws. Our
          mission is to create loving homes for every pet. With a dedication to
          animal welfare, we strive to inspire compassion and encourage
          responsible pet adoption. Join us in making a difference—one adoption
          at a time
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
