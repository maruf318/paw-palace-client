import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaQuoteLeft } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle heading={"Call To Action"}></SectionTitle>
      <div className="card flex-col lg:flex-row mb-4 card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://i.imgur.com/ys9KGWM.jpg" alt="Movie" />
        </figure>
        <div className="card-body">
          <figure className="max-w-screen-md mx-auto text-center ">
            <blockquote className="text-center ">
              <FaQuoteLeft></FaQuoteLeft>
              <p className=" text-lg md:text-2xl italic font-medium text-gray-900 dark:text-white">
                -Embark on a journey of love and adventure. Adopt a loyal
                companion today and experience the boundless joy of shared
                moments, tail wags, and unconditional friendship.-
              </p>
              <p>Robert</p>
            </blockquote>
          </figure>
        </div>
      </div>
      <div className="card flex-col lg:flex-row  card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://i.imgur.com/HI5PmFL.jpg" alt="Movie" />
        </figure>
        <div className="card-body">
          <figure className="max-w-screen-md mx-auto text-center">
            <blockquote className="text-center ">
              <FaQuoteLeft></FaQuoteLeft>
              <p className=" text-lg md:text-2xl italic font-medium text-gray-900 dark:text-white">
                -Discover joy in perfection. Consider adopting a feline friend
                and experience the warmth of quiet moments, gentle purrs, and
                the extraordinary bond that lasts a lifetime.-
              </p>
              <p>Julia</p>
            </blockquote>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
